import Image from "next/image";
import { cn } from "@/app/lib/tailwind_utils";
import { ActionButtons } from "../../components/ui/actions/ActionButtons";

type LoginIllustrationProps = {
  className?: string;
};

export function LoginIllustration({ className }: LoginIllustrationProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full",
        "flex items-center justify-center",
        "overflow-hidden",
        className
      )}
    >
      {/* Action buttons container */}
      <div className="absolute top-0 right-0 z-30">
        <div className="relative bg-dark-1000 px-2 pb-2 sm:px-3 sm:pb-3 md:px-4 md:pb-4 rounded-bl-2xl">
          <ActionButtons className="rounded-t-none" />

          {/* Inverted corner - TOP LEFT */}
          <div
            className={cn(
              "absolute top-0",
              "-left-4 w-4 h-4",
              "[background:radial-gradient(circle_at_0%_100%,transparent_16px,var(--color-dark-1000)_16px)]",
              "sm:-left-5 sm:w-5 sm:h-5",
              "sm:[background:radial-gradient(circle_at_0%_100%,transparent_20px,var(--color-dark-1000)_20px)]",
              "md:-left-6 md:w-6 md:h-6",
              "md:[background:radial-gradient(circle_at_0%_100%,transparent_24px,var(--color-dark-1000)_24px)]"
            )}
          />

          {/* Inverted corner - BOTTOM RIGHT */}
          <div
            className={cn(
              "absolute z-50",
              "right-3 -bottom-4 w-4 h-4",
              "[background:radial-gradient(circle_at_0%_100%,transparent_16px,var(--color-dark-1000)_16px)]",
              "sm:right-4 sm:-bottom-5 sm:w-5 sm:h-5",
              "sm:[background:radial-gradient(circle_at_0%_100%,transparent_20px,var(--color-dark-1000)_20px)]",
              "md:right-6 md:-bottom-6 md:w-6 md:h-6",
              "md:[background:radial-gradient(circle_at_0%_100%,transparent_24px,var(--color-dark-1000)_24px)]"
            )}
          />
        </div>
      </div>

      {/* Main illustration */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Image
          src="/login-illustration.png"
          alt="Ilustração de login com smart home e smart car"
          width={1000}
          height={700}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
