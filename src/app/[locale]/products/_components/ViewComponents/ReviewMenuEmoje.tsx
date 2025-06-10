import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs } from "@/components/ui/tabs";
import { EmojiCategory, emojis } from "@/components/Emojies/emojies";
import React from "react";

const ReviewMenuEmoje = ({
  showEmojiPicker,
  setShowEmojiPicker,
  selectedCategory,
  setSelectedCategory,
  addEmojiToContent,
  children,
}: {
  showEmojiPicker: boolean;
  setSelectedCategory: any;
  setShowEmojiPicker: any;
  selectedCategory: any;
  addEmojiToContent: any;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className="w-[320px] max-h-[250px] overflow-y-auto rounded-lg border bg-white p-2 shadow-lg"
      >
        <Tabs
          value={selectedCategory}
          onValueChange={(val: any) =>
            setSelectedCategory(val as EmojiCategory)
          }
        >
          <div className="grid grid-cols-8 gap-2 max-h-[160px] overflow-y-auto p-1">
            {(selectedCategory === "All"
              ? emojis
              : emojis.filter((e: any) => e.category === selectedCategory)
            ).map((emoji: any) => (
              <button
                key={emoji.name}
                type="button"
                onClick={() => {
                  addEmojiToContent(emoji.symbol);
                  setShowEmojiPicker(false);
                }}
                title={emoji.name}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {emoji.symbol}
              </button>
            ))}
          </div>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReviewMenuEmoje;
