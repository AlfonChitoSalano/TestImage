<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: {
    ImageSplitterComponentAsync: defineAsyncComponent(
      () => import("../components/ImageSplitterComponent.vue"),
    ),
  },
  data() {
    return {
      validRows: 1,
      validColumns: 1,
      validFile: undefined as File | undefined,
    };
  },
  methods: {
    submitForm(event: Event) {
      event.preventDefault();

      const rowsInput = document.getElementById(
        "rowsInput",
      ) as HTMLInputElement;

      const columnsInput = document.getElementById(
        "columnsInput",
      ) as HTMLInputElement;

      const rows = parseInt(rowsInput.value, 10);
      const columns = parseInt(columnsInput.value, 10);

      console.log("row no:", rows);
      console.log("column no:", columns);

      if (rows < 1 || !rows) {
        alert("Please enter a valid number of row");
        return;
      }

      if (columns < 1 || !columns) {
        alert("Please enter a valid number of column");
        return;
      }

      const fileInput = document.getElementById(
        "fileInput",
      ) as HTMLInputElement;
      const file = fileInput.files?.[0];

      if (!file) {
        alert("Please select a file.");
        return;
      }

      if (!(file instanceof File)) {
        alert("Unknown file type. Please select only gif.");
        return;
      }

      console.log("File type is:", file.type);

      if (file.type !== "image/gif") {
        alert("Please select a gif file.");
        return;
      }

      this.validFile = file;
      this.validRows = rows;
      this.validColumns = columns;
      alert("process image");
    },
  },
});
</script>

<template>
  <div>
    <p>&nbsp;</p>

    <div>
      <form enctype="multipart/form-data" @submit.prevent="submitForm">
        <label for="rowsInput">Enter a row: &nbsp;</label>
        <input type="number" id="rowsInput" name="rows" />

        <br />

        <label for="columnsInput">Enter a column: &nbsp;</label>
        <input type="number" id="columnsInput" name="columns" />

        <br />

        <label for="fileInput">Select a file: &nbsp;</label>
        <input type="file" id="fileInput" name="file" />

        <br /><br />
        <input type="submit" value="UPLOAD" />
      </form>
    </div>

    <p>&nbsp;</p>

    <ImageSplitterComponentAsync
      :noOfRows="validRows"
      :noOfColumns="validColumns"
      :imageToSplit="validFile"
    />
  </div>
</template>

<style scoped></style>
