<template>
  <div class="space-y-6 p-4 sm:p-10 pb-16 md:block relative bg-white z-10">
    <div class="flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="link"
              role="combobox"
              aria-expanded="open"
              aria-label="Menu"
              :class="'block sm:hidden w-auto px-2'"
            >
              <MenuIcon class="ml-auto h-4 w-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem
                v-for="item in sidebarNavItems"
                :class="
                  cn(
                    $route.path === `${item.href}` && 'bg-muted hover:bg-muted'
                  )
                "
              >
                {{ item.title }}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <img class="hidden sm:block" src="/image/logo.png" width="200" />
        <img class="block sm:hidden" src="/image/logo-mobile.png" width="36" />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded="open"
              aria-label="Select a team"
              :class="'sm:w-[200px] justify-between w-auto'"
            >
              <Avatar class="mr-2 h-5 w-5">
                <AvatarImage src="/images/avatar.png" alt="avatar" />
                <AvatarFallback
                  >{{ user?.firstName.charAt(0).toUpperCase()
                  }}{{ user?.lastName.charAt(0).toUpperCase() }}</AvatarFallback
                >
              </Avatar>
              <p class="hidden sm:block">
                {{ user?.firstName }} {{ user?.lastName }}
              </p>
              <ChevronDown class="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="font-normal flex">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">
                  {{ user?.firstName }} {{ user?.lastName }}
                </p>
                <p class="text-xs leading-none text-muted-foreground">
                  {{ user?.email }}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <Separator class="my-6" />
    <div
      class="flex flex-col space-y-0 sm:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"
    >
      <aside class="hidden sm:block lg:w-1/5">
        <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          <Button
            v-for="item in sidebarNavItems"
            :key="item.title"
            variant="ghost"
            :class="
              cn(
                'w-full text-left justify-start',
                $route.path === `${item.href}` && 'bg-muted hover:bg-muted'
              )
            "
          >
            {{ item.title }}
          </Button>
        </nav>
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium">Profile</h3>
            <p class="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div>
          <Separator />

          <div class="flex flex-col gap-8">
            <div>
              <p class="text-sm font-medium leading-none">Salutation</p>
              <p class="text-sm text-muted-foreground">
                {{ user?.salutation }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium leading-none">First name</p>
              <p class="text-sm text-muted-foreground">
                {{ user?.firstName }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium leading-none">Last name</p>
              <p class="text-sm text-muted-foreground">
                {{ user?.lastName }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium leading-none">Email</p>
              <p class="text-sm text-muted-foreground">{{ user?.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ParticlesBg
    class="absolute inset-0"
    :quantity="100"
    :ease="100"
    color="#FFF"
    :staticity="10"
    refresh
  />
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ChevronDown, MenuIcon } from "lucide-vue-next";
interface Item {
  title: string;
  href: string;
}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  salutation: string;
}
const sidebarNavItems: Item[] = [
  {
    title: "Basic details",
    href: "/dashboard",
  },
  {
    title: "Additional details",
    href: "/examples/forms/account",
  },
  {
    title: "Spouse details",
    href: "/examples/forms/appearance",
  },
  {
    title: "Personal preference",
    href: "/examples/forms/notifications",
  },
];
const user = ref<User>();

async function fetchUser() {
  const { data, error } = await useFetch("/api/user");
  if (data.value) {
    user.value = data.value as User;
    console.log(data.value);
  } else {
    console.error("Error fetching user data:", error.value);
  }
}
fetchUser();

const logout = async () => {
  await useFetch("/api/logout");
  navigateTo("/login");
};
</script>
