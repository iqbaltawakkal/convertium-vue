<template>
  <div v-if="!isEdit" class="flex flex-col gap-8">
    <div>
      <p class="text-sm font-medium leading-none">Date of birth</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.dateOfBirth || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Home address</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.address || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Country</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.country || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Marital status</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.maritalStatus || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Gender</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.gender || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Postal code</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.postalCode || "-" }}
      </p>
    </div>
  </div>
  <div v-else>
    <form @submit.prevent="updateUser" class="flex flex-col gap-8">
      <div>
        <Label class="text-sm font-medium leading-none">Date of birth</Label>
        <Select v-model="dateOfBirth" required>
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="Select Date of birth" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in years" :value="item.toString()">
                {{ item }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Home address</Label>
        <Input
          id="address"
          v-model="address"
          placeholder="Home address"
          type="text"
          auto-capitalize="none"
          auto-complete="address"
          auto-correct="off"
          required
          class="bg-white"
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Country</Label>
        <Input
          id="country"
          v-model="country"
          placeholder="Country"
          type="text"
          auto-capitalize="none"
          auto-complete="country"
          auto-correct="off"
          required
          class="bg-white"
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Marital status</Label>
        <Select v-model="maritalStatus" required>
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in ['married', 'single']" :value="item">
                {{ item }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Gender</Label>
        <Select v-model="gender" required>
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in ['male', 'female']" :value="item">
                {{ item }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Postal code</Label>
        <Input
          id="postalCode"
          v-model="postalCode"
          placeholder="Postal code"
          type="text"
          auto-capitalize="none"
          auto-complete="postalCode"
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
          :disabled="!maritalStatus || !country || !address || !dateOfBirth"
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
const address: any = defineModel("address");
const country: any = defineModel("country");
const dateOfBirth: any = defineModel("dateOfBirth");
const maritalStatus: any = defineModel("maritalStatus");
const gender: any = defineModel("gender");
const postalCode: any = defineModel("postalCode");

const years = [
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
  2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
];

async function updateUser() {
  if (new Date().getFullYear() - parseInt(dateOfBirth.value) < 17) {
    toast("Minimum age is 17");
    return;
  }

  const body = {
    address,
    country,
    dateOfBirth,
    maritalStatus,
    gender,
    postalCode,
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
