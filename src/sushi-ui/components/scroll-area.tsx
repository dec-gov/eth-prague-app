"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import * as React from "react";

const ScrollArea = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
	<ScrollAreaPrimitive.Root
		ref={ref}
		className={classNames("relative overflow-hidden h-full w-full", className)}
		{...props}
	>
		<ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
			{children}
		</ScrollAreaPrimitive.Viewport>
		<ScrollBar />
		<ScrollAreaPrimitive.Corner />
	</ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={classNames(
			"flex touch-none select-none transition-colors",
			orientation === "vertical" &&
				"h-full w-2.5 border-l border-l-transparent p-[1px]",
			orientation === "horizontal" &&
				"h-2.5 border-t border-t-transparent p-[1px]",
			className,
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
