import React from "react";
import { Tabs } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { EmojiCategory } from "@/components/Emojies/emojies";
const EmojiesMenu = ({
  replay,
  showEmojiPicker,
  setShowEmojiPicker,
  selectedCategory,
  setSelectedCategory,
  emojis,
  addEmojiToContent,
}: {
  replay: any;
  showEmojiPicker: any;
  setShowEmojiPicker: any;
  selectedCategory: any;
  setSelectedCategory: any;
  emojis: any;
  addEmojiToContent: any;
}) => {
  return (
    <>
      {!replay && (
        <>
          {!showEmojiPicker && (
            <button
              type="button"
              className="cursor-pointer"
              aria-label="Open emoji picker"
              onClick={() => {
                console.log("Emoji button clicked");
                setShowEmojiPicker(true);
              }}
            >
              <Image
                src="/icons/ic_outline-emoji-emotions.svg"
                alt="emoji"
                width={24}
                height={24}
              />
            </button>
          )}

          {showEmojiPicker && (
            <DropdownMenu
              open={showEmojiPicker}
              onOpenChange={setShowEmojiPicker}
            >
              <DropdownMenuTrigger asChild className="">
                <button
                  type="button"
                  className="cursor-pointer"
                  aria-label="Open emoji picker"
                >
                  <Image
                    src="/icons/ic_outline-emoji-emotions.svg"
                    alt="emoji"
                    width={24}
                    height={24}
                  />
                </button>
              </DropdownMenuTrigger>

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
                      : emojis.filter(
                          (e: any) => e.category === selectedCategory
                        )
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
          )}
        </>
      )}
    </>
  );
};

export default EmojiesMenu;
