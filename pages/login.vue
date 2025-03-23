<template>
  <div
    class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-[10%] relative z-10 bg-white"
  >
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
      <p class="text-sm text-muted-foreground">
        Enter your credentials to login
      </p>
    </div>
    <div class="grid gap-6 z-10 p-4">
      <form @submit.prevent="login">
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Label class="sr-only" for="email"> Email </Label>
            <Input
              id="email"
              v-model="email"
              placeholder="Email"
              type="email"
              auto-capitalize="none"
              auto-complete="email"
              auto-correct="off"
              required
              class="bg-white"
            />
          </div>
          <div class="grid gap-1">
            <Label class="sr-only" for="password"> Password </Label>
            <div class="relative">
              <Input
                id="password"
                placeholder="Password"
                :type="typeInput"
                auto-capitalize="none"
                auto-correct="off"
                v-model="password"
                required
                class="bg-white pr-10"
              />
              <span
                @click="
                  typeInput = typeInput === 'password' ? 'text' : 'password'
                "
                class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
              >
                <Eye
                  v-if="typeInput === 'password'"
                  class="size-5 text-muted-foreground"
                />
                <EyeClosed v-else class="size-6 text-muted-foreground" />
              </span>
            </div>
          </div>
          <div class="items-top flex gap-x-2">
            <Checkbox v-model="keepMeLoggedIn" id="terms1" />
            <div class="grid gap-1.5 leading-none">
              <label
                for="terms1"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me logged in
              </label>
            </div>
          </div>
          <Button type="submit" class="mt-4">
            <LoaderIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            Sign In
          </Button>
        </div>
      </form>
    </div>
    <div class="px-8 text-center text-sm text-muted-foreground z-10">
      <p>
        Don't have an account?
        <NuxtLink to="/register" class="underline">Register</NuxtLink>
      </p>
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
import { Eye, EyeClosed, LoaderIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
const email = ref("");
const password = ref("");
const keepMeLoggedIn = ref(false);
const isLoading = ref(false);
const typeInput = ref("password");

const login = async () => {
  try {
    // Call the login API
    isLoading.value = true;
    const { error } = await useFetch("/api/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
        keepMeLoggedIn: keepMeLoggedIn.value,
      },
    });
    if (error.value) throw Error(error.value?.data?.message);
    // Redirect to the dashboard after successful login
    navigateTo("/dashboard");
  } catch (error) {
    toast((error as Error).message || "Login failed");
  } finally {
    isLoading.value = false;
  }
};
</script>
