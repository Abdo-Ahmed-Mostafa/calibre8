import IconCircle from "./IconCircle";
import { Bell, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

type UserType = {
  name: string;
  avatar?: string; // رابط صورة البروفايل لو موجودة
};

const NavIcons = ({
  hideUserOnMobile = false,
  user,
}: {
  hideUserOnMobile?: boolean;
  user?: UserType | null;
}) => {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-5">
      <IconCircle
        icon={
          <Image
            src={"/icons/mingcute_notification-fill.svg"}
            alt="notification"
            width={30}
            height={30}
            className="!size-[32px] cursor-pointer"
          />
        }
        count={1}
      />
      <IconCircle
        icon={
          <Image src={"/icons/heart.svg"} alt="love" width={30} height={30} />
        }
        count={1}
      />

      {user ? (
        // لو مسجل دخول، عرض صورة البروفايل وروابطها لصفحة profile
        <Link href={`/${locale}/profile`}>
          {user.avatar ? (
            <Image
              src={user.avatar}
              width={32}
              height={32}
              alt={user.name}
              className="!w-8 !h-8 rounded-full object-cover cursor-pointer"
            />
          ) : (
            // لو مفيش صورة، نعرض الأيقونة User
            <IconCircle
              icon={
                <Image
                  src={"/icons/user.svg"}
                  alt="user"
                  width={30}
                  height={30}
                  className="!size-[32px] cursor-pointer"
                />
              }
            />
          )}
        </Link>
      ) : // لو مش مسجل دخول
      !hideUserOnMobile ? (
        <Link href={`/${locale}/login`}>
          <IconCircle
            icon={
              <Image
                src={"/icons/user.svg"}
                alt="user"
                width={30}
                height={30}
                className="!size-[32px] cursor-pointer"
              />
            }
          />
        </Link>
      ) : (
        <Link
          href={`/${locale}/login`}
          className="hidden md:inline-flex cursor-pointer"
        >
          <IconCircle
            icon={
              <Image
                src={"/icons/user.svg"}
                alt="user"
                width={30}
                height={30}
                className="!size-[32px]"
              />
            }
          />
        </Link>
      )}

      <IconCircle
        icon={
          <Image
            src={"/icons/shopping-cart.svg"}
            alt="cart"
            width={20}
            height={20}
            className="!size-[32px] cursor-pointer"
          />
        }
        count={1}
      />
    </div>
  );
};

export default NavIcons;
