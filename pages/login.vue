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
            <Input
              id="password"
              placeholder="Password"
              type="password"
              auto-capitalize="none"
              auto-correct="off"
              v-model="password"
              required
              class="bg-white"
            />
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
import { LoaderIcon } from "lucide-vue-next";
const email = ref("");
const password = ref("");
const isLoading = ref(false);

const login = async () => {
  try {
    // Call the login API
    isLoading.value = true;
    const { error, status } = await useFetch("/api/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    if (error.value) throw Error(status.value);
    // Redirect to the dashboard after successful login
    navigateTo("/dashboard");
  } catch (error) {
    alert((error as Error).message || "Login failed");
  } finally {
    isLoading.value = false;
  }
};
</script>
