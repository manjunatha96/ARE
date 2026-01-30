"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventFeedbackProps {
  eventId: string;
  onFeedbackSubmit?: (eventId: string, rating: "useful" | "not_useful", comment: string) => void;
}

export function EventFeedback({ eventId, onFeedbackSubmit }: EventFeedbackProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<"useful" | "not_useful" | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedRating) {
      onFeedbackSubmit?.(eventId, selectedRating, comment);
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSelectedRating(null);
        setComment("");
        setSubmitted(false);
      }, 1500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Event Feedback</DialogTitle>
          <DialogDescription>
            Was this event useful or relevant?
          </DialogDescription>
        </DialogHeader>
        
        {!submitted ? (
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                variant={selectedRating === "useful" ? "default" : "outline"}
                className={cn(
                  "flex-1 gap-2",
                  selectedRating === "useful" && "bg-green-600 hover:bg-green-700"
                )}
                onClick={() => setSelectedRating("useful")}
              >
                <ThumbsUp className="h-4 w-4" />
                Useful
              </Button>
              <Button
                variant={selectedRating === "not_useful" ? "default" : "outline"}
                className={cn(
                  "flex-1 gap-2 bg-transparent",
                  selectedRating === "not_useful" && "bg-red-600 hover:bg-red-700 text-white"
                )}
                onClick={() => setSelectedRating("not_useful")}
              >
                <ThumbsDown className="h-4 w-4" />
                Not Useful
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Comments (Optional)
              </label>
              <Textarea
                placeholder="Share your feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-background resize-none h-24"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedRating}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-2">
            <div className="text-green-600 text-2xl">✓</div>
            <p className="text-sm text-foreground font-medium">Thank you for your feedback!</p>
            <p className="text-xs text-muted-foreground">Your input helps us improve</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
