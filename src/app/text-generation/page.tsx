
"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateAIText } from "@/ai/flows/ai-text-generation-flow";
import { Sparkles, Loader2, Copy, Trash2, Send, Clock, History } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase, useCollection } from "@/firebase";
import { collection, query, orderBy, limit, doc } from "firebase/firestore";
import { setDocumentNonBlocking, initiateAnonymousSignIn } from "@/firebase";

export default function TextGenerationPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { user, isUserLoading, auth } = useUser();
  const firestore = useFirestore();

  // Sign in anonymously if not logged in
  useEffect(() => {
    if (!isUserLoading && !user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  // Fetch history from Firestore
  const historyQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/ai_interactions`),
      orderBy("timestamp", "desc"),
      limit(5)
    );
  }, [user, firestore]);

  const { data: history, isLoading: isHistoryLoading } = useCollection(historyQuery);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing input",
        description: "Please enter a prompt to forge your text.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please wait while we set up your secure session.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const output = await generateAIText(prompt);
      setResult(output);

      // Save to Firestore non-blocking
      const interactionId = Math.random().toString(36).substring(7);
      const docRef = doc(firestore, `users/${user.uid}/ai_interactions/${interactionId}`);
      
      setDocumentNonBlocking(docRef, {
        id: interactionId,
        promptText: prompt,
        generatedText: output,
        modelUsed: 'gemini-2.5-flash',
        timestamp: new Date().toISOString(),
        success: true,
        ownerId: user.uid
      }, { merge: true });

      toast({
        title: "Forging complete",
        description: "Your text is ready and saved to history.",
      });
    } catch (error) {
      toast({
        title: "Forging failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
    });
  };

  const handleClear = () => {
    setPrompt("");
    setResult("");
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [result]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tight">Workspace</h1>
              <p className="text-muted-foreground font-body">Craft your prompts and watch the AI bring them to life.</p>
            </div>

            <div className="grid gap-6">
              <Card className="border-primary/20 bg-card/40 backdrop-blur shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Your Prompt
                  </CardTitle>
                  <CardDescription>Enter details about the content you want to generate.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="e.g., Write a creative product description for a smart purple desk lamp..."
                    className="min-h-[150px] text-lg font-body leading-relaxed bg-background/50 border-muted focus-visible:ring-primary"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                  />
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-muted/20 py-4 px-6 rounded-b-lg">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClear}
                    disabled={isGenerating || (!prompt && !result)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || isUserLoading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 h-11"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Forging...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Forge Text
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {(result || isGenerating) && (
                <Card className="border-secondary/20 bg-card/40 backdrop-blur shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="font-headline flex items-center gap-2 text-secondary">
                      <Sparkles className="w-5 h-5" />
                      Forged Output
                    </CardTitle>
                    {result && !isGenerating && (
                      <Button variant="outline" size="icon" onClick={() => handleCopy(result)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[100px] relative">
                      {isGenerating && !result && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                          <Loader2 className="w-10 h-10 text-primary animate-spin" />
                          <p className="animate-pulse font-medium">Consulting the model...</p>
                        </div>
                      )}
                      <div className={`prose prose-invert max-w-none transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
                        {result && (
                          <div 
                            className="p-6 rounded-lg bg-background/30 border border-muted/50 font-body text-lg leading-relaxed whitespace-pre-wrap"
                            ref={resultRef}
                          >
                            {result}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-muted bg-card/20 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-headline flex items-center gap-2">
                  <History className="w-5 h-5 text-muted-foreground" />
                  Recent Forges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isHistoryLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : history && history.length > 0 ? (
                  history.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-background/40 border border-muted/50 space-y-2 group">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            setPrompt(item.promptText);
                            setResult(item.generatedText);
                          }}
                        >
                          <Send className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium line-clamp-2">{item.promptText}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm italic">
                    Your forge history will appear here.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-card/10 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-medium">
          Securely forged with Firebase & Gemini
        </div>
      </footer>
    </div>
  );
}
