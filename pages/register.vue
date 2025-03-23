<template>
  <div
    class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-[10%] relative z-10 bg-white"
  >
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Register</h1>
      <p class="text-sm text-muted-foreground">
        Enter your details to create your account
      </p>
    </div>
    <div class="grid gap-6 z-10 p-4 bg-white">
      <form @submit.prevent="register">
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
              type="password"
              placeholder="Password"
              auto-capitalize="none"
              auto-correct="off"
              v-model="password"
              required
              class="bg-white"
            />
          </div>
          <div class="grid gap-1">
            <Label class="sr-only" for="password"> Confirm password </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              auto-capitalize="none"
              auto-correct="off"
              v-model="confirmPassword"
              required
              class="bg-white"
            />
          </div>
          <Button
            :disabled="!password || !email || !confirmPassword"
            type="submit"
            class="mt-4"
          >
            <LoaderIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            Register
          </Button>
        </div>
      </form>
    </div>
    <div class="px-8 text-center text-sm text-muted-foreground z-10">
      <p>
        Already have an account?
        <NuxtLink to="/login" class="underline">Login</NuxtLink>
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
import { toast } from "vue-sonner";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

const register = async () => {
  if (password.value !== confirmPassword.value) {
    toast("Password and confirm password does not match");
    return;
  }
  try {
    isLoading.value = true;
    const { error } = await useFetch("/api/register", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    if (error.value) throw Error(error.value?.data?.message);
    navigateTo("/dashboard");
    toast("Register successful, you`re now logged in");
  } catch (error) {
    toast((error as Error).message || "register failed");
  } finally {
    isLoading.value = false;
  }
};
</script>
