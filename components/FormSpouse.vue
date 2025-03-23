<template>
  <div v-if="!isEdit" class="flex flex-col gap-8">
    <div>
      <p class="text-sm font-medium leading-none">Spouse salutation</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.spouseSalutation || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">First name</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.spouseFirstName || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Last name</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.spouseLastName || "-" }}
      </p>
    </div>
  </div>
  <div v-else>
    <form @submit.prevent="updateUser" class="flex flex-col gap-8">
      <div>
        <Label class="text-sm font-medium leading-none"
          >Spouse salutation</Label
        >
        <Select v-model="spouseSalutation" required>
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
          id="spouseFirstName"
          v-model="spouseFirstName"
          placeholder="First name"
          type="text"
          auto-capitalize="none"
          auto-complete="spouseFirstName"
          auto-correct="off"
          required
          class="bg-white"
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Last name</Label>
        <Input
          id="spouseLastName"
          v-model="spouseLastName"
          placeholder="Last name"
          type="text"
          auto-capitalize="none"
          auto-complete="spouseLastName"
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
          :disabled="!spouseLastName || !spouseFirstName || !spouseSalutation"
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
const spouseFirstName: any = defineModel("spouseFirstName");
const spouseLastName: any = defineModel("spouseLastName");
const spouseSalutation: any = defineModel("spouseSalutation");

async function updateUser() {
  const body = {
    spouseFirstName,
    spouseLastName,
    spouseSalutation,
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
