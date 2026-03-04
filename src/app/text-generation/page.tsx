
"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateAIText } from "@/ai/flows/ai-text-generation-flow";
import { Sparkles, Loader2, Copy, Trash2, Send, Download } from "lucide-react";

export default function TextGenerationPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing input",
        description: "Please enter a prompt to forge your text.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const output = await generateAIText(prompt);
      setResult(output);
      toast({
        title: "Forging complete",
        description: "Your AI-generated text is ready.",
      });
    } catch (error) {
      toast({
        title: "Forging failed",
        description: "An error occurred while generating text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard",
      description: "Text is ready to be pasted elsewhere.",
    });
  };

  const handleClear = () => {
    setPrompt("");
    setResult("");
    toast({
      title: "Workspace cleared",
      description: "Ready for a new project.",
    });
  };

  // Scroll to bottom of result when it updates
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [result]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-headline text-4xl font-bold tracking-tight">Workspace</h1>
            <p className="text-muted-foreground font-body">Craft your prompts and watch the AI bring them to life.</p>
          </div>

          <div className="grid gap-6">
            {/* Input Card */}
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
                  placeholder="e.g., Write a creative product description for a smart purple desk lamp named 'Lumina'..."
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
                  Clear Workspace
                </Button>
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
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

            {/* Output Card */}
            {(result || isGenerating) && (
              <Card className="border-secondary/20 bg-card/40 backdrop-blur shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-secondary" />
                      Forged Output
                    </CardTitle>
                    <CardDescription>Refine or copy your generated text below.</CardDescription>
                  </div>
                  {result && !isGenerating && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={handleCopy}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="min-h-[100px] relative">
                    {isGenerating && !result && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="animate-pulse font-medium">Consulting the model...</p>
                      </div>
                    )}
                    <div className={`prose prose-invert max-w-none transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
                      {result ? (
                        <div 
                          className="p-6 rounded-lg bg-background/30 border border-muted/50 font-body text-lg leading-relaxed whitespace-pre-wrap"
                          ref={resultRef}
                        >
                          {result}
                        </div>
                      ) : !isGenerating && (
                        <div className="text-center py-12 text-muted-foreground italic">
                          Output will appear here.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                {result && !isGenerating && (
                  <CardFooter className="justify-end border-t border-muted/20 pt-4">
                    <p className="text-xs text-muted-foreground">Generated by AI TextForge</p>
                  </CardFooter>
                )}
              </Card>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-card/10 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Powered by Gemini & Next.js
        </div>
      </footer>
    </div>
  );
}
