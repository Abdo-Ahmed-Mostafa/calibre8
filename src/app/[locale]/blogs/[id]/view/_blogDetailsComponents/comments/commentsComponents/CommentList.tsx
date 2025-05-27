// components/CommentLikesDialog.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useMainHook } from "@/lib/Hook/useMainHook";
import Image from "next/image";
import "./css/DialogCss.css";
type LikeUser = {
  id: number;
  name: string;
  avatar: string;
};

export default function CommentLikesDialog({
  open,
  onClose,
  commentId,
}: {
  open: boolean;
  onClose: () => void;
  commentId: number | string;
}) {
  const [list, setList] = useState<LikeUser[]>([]);
  const { t } = useMainHook();
  const [isLoading, setIsLoading] = useState(true);

  const getLikesList = () => {
    setIsLoading(true);
    axiosInstance.get(`/api/public/comment_like/${commentId}`).then((res) => {
      setList(res?.data?.data || []);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    open && getLikesList();
  }, [open, commentId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] [&>button]:hidden max-h-[90vh] overflow-y-auto custom-scroll">
        <div className="flex justify-between items-center w-full">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {t("Total Likes")} :
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3">
            <span className="text-green-600 font-semibold">{list.length}</span>
            <Image
              src={"/icons/iconamoon_like-fill.svg"}
              width={24}
              height={24}
              alt=""
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="bg-[#E4FFD4] size-[40px] rounded-[8px] cursor-pointer"
            >
              <X />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px] w-full pr-2">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 py-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                  <Separator />
                </div>
              ))
            : list.map((user, index) => (
                <div key={user.id + "-" + index}>
                  <div className="flex items-center gap-4 py-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                    </Avatar>
                    <span className="text-base font-medium">{user.name}</span>
                  </div>
                  <Separator />
                </div>
              ))}
        </ScrollArea>

        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            className="w-full text-[#83C55A] border-[#83C55A] font-[600] text-[20px] cursor-pointer hover:text-[#83C55A]"
            onClick={onClose}
          >
            <Image
              alt="back"
              src={`/icons/pajamas_go-back.svg`}
              width={24}
              className="size-[24px]"
              height={24}
            />{" "}
            {t("back")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
