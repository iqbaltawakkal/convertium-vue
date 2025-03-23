<template>
  <div v-if="!isEdit" class="flex flex-col gap-8">
    <div>
      <p class="text-sm font-medium leading-none">Hobbies and interest</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.hobbiesInterests || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Favorite sport</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.favoriteSport || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Preferred movie</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.preferredMovie || "-" }}
      </p>
    </div>
    <div>
      <p class="text-sm font-medium leading-none">Preferred music</p>
      <p class="text-sm text-muted-foreground">
        {{ user?.preferredMusic || "-" }}
      </p>
    </div>
  </div>
  <div v-else>
    <form @submit.prevent="updateUser" class="flex flex-col gap-8">
      <div>
        <Label class="text-sm font-medium leading-none"
          >Hobbies and interest</Label
        >
        <Textarea
          v-model="hobbiesInterests"
          placeholder="Hobbies and interest.."
          required
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Favorite sport</Label>
        <Textarea
          v-model="favoriteSport"
          placeholder="Favorite sport.."
          required
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Preferred movie</Label>
        <Textarea
          v-model="preferredMovie"
          placeholder="Preferred movie.."
          required
        />
      </div>
      <div>
        <Label class="text-sm font-medium leading-none">Preferred music</Label>
        <Textarea
          v-model="preferredMusic"
          placeholder="Preferred music.."
          required
        />
      </div>
      <div class="flex justify-end">
        <Button variant="link" @click.prevent="emits('cancel')">
          Cancel
        </Button>
        <Button
          :disabled="
            !hobbiesInterests ||
            !preferredMovie ||
            !preferredMusic ||
            !favoriteSport
          "
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
const favoriteSport: any = defineModel("favoriteSport");
const preferredMovie: any = defineModel("preferredMovie");
const hobbiesInterests: any = defineModel("hobbiesInterests");
const preferredMusic: any = defineModel("preferredMusic");

async function updateUser() {
  const body = {
    favoriteSport,
    preferredMovie,
    hobbiesInterests,
    preferredMusic,
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
