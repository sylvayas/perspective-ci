"use client";

import * as React from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuList } from "@/config/menu-list";
import GridPattern from "@/components/magicui/grid-pattern";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"




export function MainNav() {
    const pathname = usePathname();
    const menuList = getMenuList(pathname);

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="relative mr-6 flex items-center space-x-2">
                <Icons.logo_black_rogner className="w-12" />
            </Link>
            <NavigationMenu className="hidden items-center space-x-6 text-sm font-medium xl:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href={menuList[0].menus[0].href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), `${menuList[0].menus[0].active && "font-bold text-novis_orange"}`)} >
                                {menuList[0].menus[0].label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(`${menuList[1].menus[0].active && "font-bold text-novis_orange"}`)}>{menuList[1].menus[0].label}</NavigationMenuTrigger>
                       <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-6">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full ring-2 ring-novis_yellow select-none flex-col justify-end rounded-md bg-perspectives_marron p-6 no-underline outline-none focus:shadow-md"
                                            href={menuList[1].menus[0].href}
                                        >
                                            <Icons.logo_black className="h-25 w-25 mb-4" />

                                            <p className="text-sm leading-tight text-white">
                                                Bienvenue a PersPectives.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                {menuList[1].menus[0].submenus.slice(1,).map((item) => (
                                    <ListItem key={item.label} href={item.href} title={item.label} className={cn(`${item.active && "font-bold text-novis_orange"}`)} />
                                ))}
                            </ul>
                            <GridPattern
                                squares={[
                                    [4, 4],
                                    [5, 1],
                                    [8, 2],
                                    [5, 3],
                                    [5, 5],
                                    [10, 10],
                                    [12, 15],
                                    [15, 10],
                                    [10, 15],
                                    [15, 10],
                                    [10, 15],
                                    [15, 10],
                                ]}
                                className={cn(
                                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                                )}
                            />
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>{menuList[2].menus[0].label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {menuList[2].menus[0].submenus.map((item, index: number) => (
                                    <ListItem key={index} href={item.href} title={`${index + 1}- ${item.label}`} className={cn(`${item.active && "font-bold text-novis_orange"}`)} />
                                ))}
                            </ul>
                            <GridPattern
                                squares={[
                                    [4, 4],
                                    [5, 1],
                                    [8, 2],
                                    [5, 3],
                                    [5, 5],
                                    [10, 10],
                                    [12, 15],
                                    [15, 10],
                                    [10, 15],
                                    [15, 10],
                                    [10, 15],
                                    [15, 10],
                                ]}
                                className={cn(
                                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                                )}
                            />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(`${menuList[3].menus[0].active && "font-bold text-novis_orange"}`)}>{menuList[3].menus[0].label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-6">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full ring-2 ring-novis_yellow select-none flex-col justify-end rounded-md bg-perspectives_marron p-6 no-underline outline-none focus:shadow-md"
                                            href={menuList[3].menus[0].href}
                                        >
                                            <Icons.logo_black className="h-20 w-20 mb-4" />

                                            <p className="text-sm leading-tight text-white">
                                            Découvrez notre galerie.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                {menuList[3].menus[0].submenus.slice(0,).map((item) => (
                                    <ListItem key={item.label} href={item.href} title={item.label} className={cn(`${item.active && "font-bold text-novis_orange"}`)} />
                                ))}
                            </ul>
                            <GridPattern
                                squares={[
                                    [4, 4],
                                    [5, 1],
                                    [8, 2],
                                    [5, 3],
                                    [5, 5],
                                    [10, 10],
                                    [12, 15],
                                    [15, 10],
                                    [10, 15],
                                    [15, 10],
                                    [10, 15],
                                    [15, 10],
                                ]}
                                className={cn(
                                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                                )}
                            />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={menuList[4].menus[0].href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), `${menuList[4].menus[0].active && "font-bold text-novis_orange"}`)} >
                                {menuList[4].menus[0].label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={menuList[5].menus[0].href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), `${menuList[5].menus[0].active && "font-bold text-novis_orange"}`)} >
                                {menuList[5].menus[0].label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                        <Link href={menuList[6].menus[0].href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), `${menuList[6].menus[0].active && "font-bold text-novis_orange"}`)} >
                                {menuList[6].menus[0].label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>  */}


                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <p className="line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                    <div className="text-sm font-medium leading-none">{title}</div>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

