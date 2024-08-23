<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ImageSplitterComponent",
  props: {
    noOfRows: {
      type: Number,
      default: 1,
    },
    noOfColumns: {
      type: Number,
      default: 1,
    },
    imageToSplit: {
      type: Object as PropType<File | undefined>,
      default: undefined,
    },
  },
  data() {
    return {
      splitImages: [] as string[],
    };
  },
  computed: {
    imageUrl() {
      return this.imageToSplit ? URL.createObjectURL(this.imageToSplit) : "";
    },

    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.noOfColumns}, 1fr)`,
        gridTemplateRows: `repeat(${this.noOfRows}, auto)`,
      };
    },
  },
  watch: {
    imageToSplit() {
      this.splitImages = [];
    },
  },
  methods: {
    splitImage() {
      if (!this.imageToSplit) {
        return;
      }

      this.splitImages = [];
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            return;
          }

          const { noOfRows, noOfColumns } = this;
          const pieceWidth = img.width / noOfColumns;
          const pieceHeight = img.height / noOfRows;

          for (let y = 0; y < noOfRows; y++) {
            for (let x = 0; x < noOfColumns; x++) {
              canvas.width = pieceWidth;
              canvas.height = pieceHeight;
              context.drawImage(
                img,
                x * pieceWidth,
                y * pieceHeight,
                pieceWidth,
                pieceHeight,
                0,
                0,
                pieceWidth,
                pieceHeight,
              );
              this.splitImages.push(canvas.toDataURL());
            }
          }
        };

        img.src = event.target?.result as string;
      };

      reader.readAsDataURL(this.imageToSplit);
    },
  },
});
</script>

<template>
  <div>
    <h2>Image Splitter Here</h2>

    <button v-if="imageToSplit" @click="splitImage">
      Process Image Splitter
    </button>

    <div v-if="imageToSplit && splitImages.length !== 0">
      <h3>Original Image (compressed)</h3>

      <img :src="imageUrl" alt="Original Image" class="original-img" />
    </div>

    <div v-if="splitImages.length">
      <h3>Result</h3>

      <div class="split-grid" :style="gridStyle">
        <div
          v-for="(image, index) in splitImages"
          :key="index"
          class="split-cell"
        >
          <img :src="image" :alt="'Split Image ' + index" />
        </div>
      </div>
    </div>

    <p>&nbsp;</p>
  </div>
</template>

<style scoped>
button {
  background-color: #4caf50;
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button:focus,
button:active {
  outline: none;
  border: none;
}

img {
  margin: 5px;
  border: 1px solid #000;
}

.original-img {
  height: 14rem;
  width: 14rem;
}

.split-grid {
  display: grid;
  width: 24rem;
  margin: 0 auto;
  gap: 6px;
}

.split-cell img {
  width: 100%;
  height: 100%;
}
</style>
