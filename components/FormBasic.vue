<template>
  <div v-if="!isEdit" class="flex flex-col gap-8">
    <div>
      <p class="text-sm font-medium leading-none">Salutation</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.salutation || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">First name</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.firstName || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Last name</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.lastName || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Email</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.email || "-" }}
      </p>
    </div>
  </div>
  <div v-else>
    <form @submit.prevent="updateUser" class="flex flex-col gap-8">
      <div>
        <Label class="text-sm font-medium leading-none">Salutation</Label>
        <Select v-model="salutation" required>
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="Select salutation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in ['Mr.', 'Mrs.']" :value="item">
                {{ item }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">First name</Label>
        <Input
          id="firstName"
          v-model="firstName"
          placeholder="First name"
          type="text"
          auto-capitalize="none"
          auto-complete="firstName"
          auto-correct="off"
          required
          class="bg-white"
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Last name</Label>
        <Input
          id="lastName"
          v-model="lastName"
          placeholder="Last name"
          type="text"
          auto-capitalize="none"
          auto-complete="lastName"
          auto-correct="off"
          required
          class="bg-white"
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Email</Label>
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
      <div class="flex justify-end">
        <Button variant="link" @click.prevent="emits('cancel')">
          Cancel
        </Button>
        <Button
          :disabled="!email || !firstName || !lastName || !salutation"
          type="submit"
          v-if="isEdit"
        >
          <LoaderIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Save
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { LoaderIcon } from "lucide-vue-next";

const isLoading = ref(false);
defineProps({
  user: Object,
  isEdit: Boolean,
});
const emits = defineEmits(["done", "cancel"]);
const firstName: any = defineModel("firstName");
const lastName: any = defineModel("lastName");
const salutation: any = defineModel("salutation");
const email: any = defineModel("email");

async function updateUser() {
  const body = {
    firstName,
    lastName,
    salutation,
    email,
  };
  try {
    isLoading.value = true;
    const { data, error, status } = await useFetch("/api/update", {
      method: "POST",
      body,
    });
    if (error.value) throw Error(status.value);
    toast("Update success");
    emits("done");
  } catch (e) {
    toast((e as Error).message || "Update failed");
  } finally {
    isLoading.value = false;
  }
}
</script>
