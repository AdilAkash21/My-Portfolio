import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Camera, Loader2, LogOut, Trash2, Github, Linkedin, Twitter, Globe } from "lucide-react";
import ImageCropDialog from "@/components/ImageCropDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Crop state
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, bio, avatar_url, gender, age, github_url, linkedin_url, twitter_url, website_url")
        .eq("user_id", user.id)
        .single();
      if (!error && data) {
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setGender(data.gender || "");
        setAge(data.age != null ? String(data.age) : "");
        setGithubUrl(data.github_url || "");
        setLinkedinUrl(data.linkedin_url || "");
        setTwitterUrl(data.twitter_url || "");
        setWebsiteUrl(data.website_url || "");
        setAvatarUrl(data.avatar_url);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Image must be under 5 MB.", variant: "destructive" });
      return;
    }
    setPendingFile(file);
    setCropSrc(URL.createObjectURL(file));
    // reset so same file can be re-selected
    e.target.value = "";
  };

  const handleCropComplete = async (blob: Blob) => {
    setCropSrc(null);
    setPendingFile(null);
    if (!user) return;

    setUploading(true);
    const path = `${user.id}/avatar.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, blob, { upsert: true, contentType: "image/jpeg" });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    const newUrl = `${publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: newUrl })
      .eq("user_id", user.id);

    if (updateError) {
      toast({ title: "Error", description: updateError.message, variant: "destructive" });
    } else {
      setAvatarUrl(newUrl);
      toast({ title: "Avatar updated" });
    }
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim(),
        bio: bio.trim(),
        gender: gender.trim() || null,
        age: age.trim() ? parseInt(age.trim(), 10) : null,
        github_url: githubUrl.trim() || null,
        linkedin_url: linkedinUrl.trim() || null,
        twitter_url: twitterUrl.trim() || null,
        website_url: websiteUrl.trim() || null,
      })
      .eq("user_id", user.id);

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile saved" });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      const { error } = await supabase.from("profiles").delete().eq("user_id", user.id);
      if (error) throw error;
      await signOut();
      toast({ title: "Account deleted", description: "Your profile has been removed." });
      navigate("/");
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to delete account.", variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const initials = displayName
    ? displayName.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-lg border-border bg-card">
        <CardHeader>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 self-start"
          >
            <ArrowLeft size={16} /> Back
          </Link>
          <CardTitle className="text-2xl gradient-text">Profile Settings</CardTitle>
        </CardHeader>

        <form onSubmit={handleSave}>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Avatar className="h-24 w-24 border-2 border-primary/30">
                  <AvatarImage src={avatarUrl ?? undefined} alt="Avatar" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : (
                    <Camera className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <p className="text-xs text-muted-foreground">Click to upload & crop (max 5 MB)</p>
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" placeholder="Your name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={100} />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Your age" value={age} onChange={(e) => setAge(e.target.value)} min={1} max={150} />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself…" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={500} rows={4} />
              <p className="text-xs text-muted-foreground text-right">{bio.length}/500</p>
            </div>

            {/* Social Links */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-foreground">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-muted-foreground flex-shrink-0" />
                  <Input placeholder="https://github.com/username" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-muted-foreground flex-shrink-0" />
                  <Input placeholder="https://linkedin.com/in/username" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                </div>
                <div className="flex items-center gap-3">
                  <Twitter size={18} className="text-muted-foreground flex-shrink-0" />
                  <Input placeholder="https://twitter.com/username" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} />
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-muted-foreground flex-shrink-0" />
                  <Input placeholder="https://yourwebsite.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </Button>

            {/* Account actions */}
            <div className="border-t border-border pt-6 space-y-3">
              <button
                type="button"
                onClick={signOut}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut size={16} /> Sign Out
              </button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-destructive/30 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 size={16} /> Delete Account
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your profile data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {deleting ? "Deleting…" : "Yes, delete my account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Crop dialog */}
      {cropSrc && (
        <ImageCropDialog
          open={!!cropSrc}
          imageSrc={cropSrc}
          onClose={() => { setCropSrc(null); setPendingFile(null); }}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default Profile;
