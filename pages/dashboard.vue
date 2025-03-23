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
                @click="section = item.section"
                :class="
                  cn(section === `${item.section}` && 'bg-muted hover:bg-muted')
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
              <p class="hidden sm:block max-w-44 line-clamp-1">
                {{ user?.firstName }} {{ user?.lastName }}
              </p>
              <ChevronDown class="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="font-normal flex">
              <div class="flex flex-col space-y-1 max-w-52">
                <p v-once class="text-sm font-medium leading-none line-clamp-1">
                  {{ user?.firstName }} {{ user?.lastName }}
                </p>
                <p v-once class="text-xs leading-none text-muted-foreground">
                  {{ user?.email }}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem> Home </DropdownMenuItem>
              <DropdownMenuItem> My profile </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout"> Log out </DropdownMenuItem>
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
            @click="section = item.section"
            :key="item.title"
            variant="ghost"
            :class="
              cn(
                'w-full text-left justify-start',
                section === `${item.section}` && 'bg-muted hover:bg-muted'
              )
            "
          >
            {{ item.title }}
          </Button>
        </nav>
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-medium">Profile</h3>
              <p class="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <Button v-if="!isEdit" variant="outline" @click="isEdit = true">
              <Pencil class="h-4 w-4" />
              <p class="hidden sm:block">Edit</p>
            </Button>
          </div>
          <Separator />

          <FormBasic
            v-if="section === 'basic'"
            @cancel="isEdit = false"
            @done="
              () => {
                isEdit = false;
                fetchUser();
              }
            "
            :isEdit="isEdit"
            :user="user"
            v-model:firstName="userTemp.firstName"
            v-model:lastName="userTemp.lastName"
            v-model:email="userTemp.email"
            v-model:salutation="userTemp.salutation"
          />
          <FormAdditional
            v-if="section === 'additional'"
            @cancel="isEdit = false"
            @done="
              () => {
                isEdit = false;
                fetchUser();
              }
            "
            :isEdit="isEdit"
            :user="user"
            v-model:address="userTemp.address"
            v-model:country="userTemp.country"
            v-model:dateOfBirth="userTemp.dateOfBirth"
            v-model:postalCode="userTemp.postalCode"
            v-model:gender="userTemp.gender"
            v-model:maritalStatus="userTemp.maritalStatus"
          />
          <FormSpouse
            v-if="section === 'spouse'"
            @cancel="isEdit = false"
            @done="
              () => {
                isEdit = false;
                fetchUser();
              }
            "
            :isEdit="isEdit"
            :user="user"
            v-model:spouseFirstName="userTemp.spouseFirstName"
            v-model:spouseLastName="userTemp.spouseLastName"
            v-model:spouseSalutation="userTemp.spouseSalutation"
          />
          <FormPersonal
            v-if="section === 'personal'"
            @cancel="isEdit = false"
            @done="
              () => {
                isEdit = false;
                fetchUser();
              }
            "
            :isEdit="isEdit"
            :user="user"
            v-model:hobbiesInterests="userTemp.hobbiesInterests"
            v-model:favoriteSport="userTemp.favoriteSport"
            v-model:preferredMusic="userTemp.preferredMusic"
            v-model:preferredMovie="userTemp.preferredMovie"
          />
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
import { ChevronDown, MenuIcon, Pencil } from "lucide-vue-next";
import { toast } from "vue-sonner";
import FormAdditional from "~/components/FormAdditional.vue";
import FormPersonal from "~/components/FormPersonal.vue";
import FormSpouse from "~/components/FormSpouse.vue";

interface Item {
  title: string;
  section: string;
}
const sidebarNavItems: Item[] = [
  {
    title: "Basic details",
    section: "basic",
  },
  {
    title: "Additional details",
    section: "additional",
  },
  {
    title: "Spouse details",
    section: "spouse",
  },
  {
    title: "Personal preference",
    section: "personal",
  },
];

interface User {
  firstName: string;
  lastName: string;
  email: string;
  salutation: string;
  address: string;
  country: string;
  postalCode: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  spouseFirstName: string;
  spouseLastName: string;
  spouseSalutation: string;
  hobbiesInterests: string;
  favoriteSport: string;
  preferredMusic: string;
  preferredMovie: string;
}
const user = ref<User>();
const userTemp = ref<User>({
  firstName: "",
  lastName: "",
  salutation: "",
  email: "",
  address: "",
  country: "",
  postalCode: "",
  dateOfBirth: "",
  maritalStatus: "",
  gender: "",
  spouseFirstName: "",
  spouseLastName: "",
  spouseSalutation: "",
  hobbiesInterests: "",
  favoriteSport: "",
  preferredMusic: "",
  preferredMovie: "",
});
const section = ref("basic");
const isEdit = ref(false);

async function fetchUser() {
  const { data, error } = await useFetch("/api/user");
  if (data.value) {
    user.value = data.value as User;
    userTemp.value = { ...user.value };
  } else {
    toast(`Error fetching user data: ${error.value}`);
  }
}
fetchUser();

const logout = async () => {
  await useFetch("/api/logout");
  navigateTo("/login");
};
</script>
