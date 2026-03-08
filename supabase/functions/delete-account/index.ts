// ─── Delete Account Edge Function ───
// A serverless backend function that permanently deletes a user's account.
// Steps:
// 1. Verify the calling user's identity via their auth token
// 2. Delete their avatar files from storage
// 3. Delete their profile record from the database
// 4. Delete their auth user account (this is irreversible)
// Requires admin (service role) privileges to delete auth users.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers to allow requests from any origin (required for browser fetch calls)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Step 1: Extract and verify the user's auth token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get environment variables for database connection
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Create a client using the user's token to verify their identity
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify the token and get the user object
    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Use admin client (service role) for privileged operations
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Delete all avatar files from storage for this user
    const { data: files } = await adminClient.storage
      .from("avatars")
      .list(user.id);
    if (files && files.length > 0) {
      const filePaths = files.map((f: any) => `${user.id}/${f.name}`);
      await adminClient.storage.from("avatars").remove(filePaths);
    }

    // Step 3: Delete the user's profile record
    await adminClient.from("profiles").delete().eq("user_id", user.id);

    // Step 4: Delete the auth user account (irreversible)
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(
      user.id
    );

    if (deleteError) {
      return new Response(JSON.stringify({ error: deleteError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    // Catch-all error handler
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
