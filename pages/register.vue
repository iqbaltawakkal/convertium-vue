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
            <Label class="sr-only" for="first-name"> First name </Label>
            <Input
              id="first-name"
              type="text"
              placeholder="First name"
              auto-capitalize="none"
              auto-correct="off"
              v-model="firstName"
              required
              class="bg-white"
            />
          </div>
          <div class="grid gap-1">
            <Label class="sr-only" for="last-name"> Last name </Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Last name"
              auto-capitalize="none"
              auto-correct="off"
              v-model="lastName"
              required
              class="bg-white"
            />
          </div>
          <div class="grid gap-1">
            <Label class="sr-only" for="last-name"> Salutation </Label>
            <Select v-model="salutation" required>
              <SelectTrigger class="bg-white">
                <SelectValue placeholder="Select salutation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in salutations" :value="item">
                    {{ item }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" class="mt-4">
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
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const salutation = ref("");
const salutations = ["Mr.", "Mrs."];
const isLoading = ref(false);

const register = async () => {
  try {
    isLoading.value = true;
    const { error, status } = await useFetch("/api/register", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        salutation: salutation.value,
      },
    });
    if (error.value) throw Error(status.value);
    navigateTo("/dashboard");
  } catch (error) {
    alert((error as Error).message);
  }
};
</script>
