<template>
	<!-- <div :style="style" ref="container"> -->
		<div class="image-magnifier" 
			@mouseenter="handleOver"
			@mousemove="handleMove"
			@mouseleave="handleOut"
			:style="style"
		>
			<!-- <img 
				:width="width"
				:height="height"
				:src="src"
				class="image-magnifier__img"
				ref="img"
				id="img"
				@load="emitImageLoaded()"
			/> -->
			<img
				:src="src"
				class="image-magnifier__img"
				ref="img"
				id="img"
				@load="emitImageLoaded()"
			/>

			<div 
				class="image-magnifier__zoom" 
				:class="zoomClass" 
				:style="zoomStyle" 
				ref="zoom" 
				v-show="zoomShow" 
			>
				<img 
					class="image-magnifier__zoomImg" 
					:src="zoomSrc" 
					:style="zoomImgStyle" 
				/>
			</div>
		</div>

	<!-- </div> -->
</template>


<script>
  export default {
		// Code adapted from: https://github.com/anthinkingcoder/vue-image-magnifier/blob/master/src/components/ImageMagnifier.vue
    name: "ImageMagnifier",

    props: {
      width: {
        default: 'auto'
      },
      height: {
        default: 'auto'
      },
      src: {},
      zoomSrc: {},
      zoom: {
        type: Number,
        default: 6
      },
      zoomWidth: {
        default: 'auto'
      },
      zoomHeight: {
        default: 'auto'
      },
      zoomRadius: {
        default: '0%'
      },
      zoomClass: {},
      maskShow: {
        type: Boolean,
        default: true
      },
      delayIn: {
        type: Number,
        default: 0
      },
      delayOut: {
        type: Number,
        default: 0
			},
			showCursor: {
				type: Boolean,
				default: true
			}
    },

    data() {
      return {
        zoomShow: false,
        imgRect: '',
        maskX: 0,
				maskY: 0,
				maskWidth: 100,
      	maskHeight: 100,
        zoomX: 0,
        zoomY: 0,
        zoomImage: '',
        zoomLeft: '',
        zoomImgWidth: 0,
        zoomImgHeight: 0,
        zoomPosition: {
          x: 0,
          y: 0
        },
        zoomInTimeoutId: null,
				zoomOutTimeoutId: null
      }
    },

    computed: {
      style() {
        return {
          position: 'relative',
					cursor: this.showCursor ? 'move' : 'none',
        }
      },
      zoomStyle() {
        return {
					'--zoomWidth' : this.zoomWidth + 'px',
					'--zoomHeight' : this.zoomHeight + 'px',
					'--zoomX' : this.zoomX + 'px',
					'--zoomY' : this.zoomY + 'px',
					'--zoomRadius' : this.zoomRadius
        }
      },
      zoomImgStyle() {
        return {
					'--zoomImgWidth' : this.zoomImgWidth + 'px',
					'--zoomImgHeight' : this.zoomImgHeight + 'px',
					'--zoomPositionX' : -this.zoomPosition.x + 'px',
					'--zoomPositionY' : -this.zoomPosition.y + 'px'
        }
      }
		},
		
    methods: {
			emitImageLoaded() {
				// const imgElement = this.$refs.img.getBoundingClientRect()
				const img_element = document.getElementById('img')
      	console.log('in emitImageLoaded, img_element =')
      	console.log(img_element)
				this.$emit('imgloaded', img_element)
			},
      handleOver() {
        clearTimeout(this.zoomOutTimeoutId);
        this.calcZoomSize();
        if (this.delayIn === 0) {
          this.zoomShow = true;
        } else {
          this.zoomInTimeoutId = setTimeout(() => {
            this.zoomShow = true;
          }, this.delayIn)
        }
			},
			
      calcZoomSize() {
        this.imgRect = this.$refs.img && this.$refs.img.getBoundingClientRect();

				if (this.imgRect && this.zoom) {
          this.zoomImgWidth = this.zoom * this.zoomWidth;
          this.zoomImgHeight = this.zoom * this.zoomHeight;
        }
			},
			
      handleMove(e) {
        if (!this.imgRect) {
          return;
				}
				this.maskX = e.clientX - this.imgRect.left - this.maskWidth;
				this.maskY = e.clientY - this.imgRect.top - this.maskHeight;

				this.zoomX = e.clientX - this.imgRect.left - this.zoomWidth / 2;
				this.zoomY = e.clientY - this.imgRect.top - this.zoomHeight / 2;

        this.zoomLeft = this.imgRect.width + 10;
        this.zoomPosition.x = this.maskX * (this.zoomImgWidth / this.imgRect.width);
				this.zoomPosition.y = this.maskY * (this.zoomImgHeight / this.imgRect.height);
			},
			
      handleOut() {
        clearTimeout(this.zoomInTimeoutId);
        if (this.delayOut === 0) {
          this.zoomShow = false;
        } else {
          this.zoomOutTimeoutId = setTimeout(() => {
            this.zoomShow = false;
          }, this.delayOut);
        }
			},
    }
  }
</script>


<style lang="scss" scoped>
.image-magnifier {
	&__img {
		// width: var(--imgWidth);
		// height: var(--imgHeight);		
		width: auto;
		height: auto;		
		max-width: 100%;
		max-height: 100%;		
		// width: auto;
		// height: auto;		
		// width: auto;
		// height: 100%;
		object-fit: contain; 
	}

	&__zoom {
		width: var(--zoomWidth);
		height: var(--zoomHeight);
		position: absolute;
		left: 0;
		top: 0;
		transform: translate(var(--zoomX), var(--zoomY));
		overflow: hidden;
		z-index: 2000;
  	border: 1px solid #000;
		border-radius: var(--zoomRadius);
		background-color: #000;
		pointer-events: none;
	}

	&__zoomImg {
		width: var(--zoomImgWidth);
		height: var(--zoomImgHeight);
		will-change: transform;
		transform: translate(var(--zoomPositionX), var(--zoomPositionY));
		pointer-events: none;
	}
}
</style>