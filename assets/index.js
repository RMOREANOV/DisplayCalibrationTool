new Vue({
    el: '#app',
    data() {
        return {
            colors: {
                black: {
                    squareColor: 'rgb(0, 0, 0)',
                    middleColor: 'rgb(16, 16, 16)',
                    innerSquareColor: 'rgb(25, 25, 25)',
                    description: 'Ajusta el contraste al máximo y ve reduciendo gradualmente hasta que puedas distinguir tres tonalidades de negro. Para mejores resultados, observa desde una distancia mínima de 50 cm.'
                },
                white: {
                    squareColor: 'rgb(255, 255, 255)',
                    middleColor: 'rgb(248, 248, 248)',
                    innerSquareColor: 'rgb(239, 239, 239)',
                    description: 'Ajusta el contraste al máximo y ve reduciendo gradualmente hasta que puedas distinguir tres tonalidades de blanco. Para mejores resultados, observa desde una distancia mínima de 50 cm.'
                },
                red: {
                    squareColor: 'rgb(186, 0, 0)',
                    innerSquareColor: 'rgb(186, 186, 186)',
                    description: 'Ajusta el nivel de gamma del rojo hasta que solo veas un tono rojo uniforme. Para mejores resultados, observa desde una distancia mínima de 80 cm. Puedes usar el Software: <a href="https://quickgamma.de/indexen.html" target="_blank">QuickGamma</a>'
                },
                green: {
                    squareColor: 'rgb(0, 186, 0)',
                    innerSquareColor: 'rgb(186, 186, 186)',
                    description: 'Ajusta el nivel de gamma del verde hasta que solo veas un tono verde uniforme. Para mejores resultados, observa desde una distancia mínima de 80 cm. Puedes usar el Software: <a href="https://quickgamma.de/indexen.html" target="_blank">QuickGamma</a>'
                },
                blue: {
                    squareColor: 'rgb(0, 0, 186)',
                    innerSquareColor: 'rgb(186, 186, 186)',
                    description: 'Ajusta el nivel de gamma del azul hasta que solo veas un tono azul uniforme. Para mejores resultados, observa desde una distancia mínima de 80 cm. Puedes usar el Software: <a href="https://quickgamma.de/indexen.html" target="_blank">QuickGamma</a>'
                },
            },
            selectedColor: 'black',
            squareSize: 400,
            middleSize: 300,
            innerSize: 200,
        };
    },
    computed: {
        currentColors() {
            return this.colors[this.selectedColor];
        }
    },
    template: `
        <div class="outer-container">
            <div class="color-selector">
                <button @click="onColorChange('black')" class="color-btn black-btn">Negro</button>
                <button @click="onColorChange('white')" class="color-btn white-btn">Blanco</button>
                <button @click="onColorChange('red')" class="color-btn red-btn">Rojo</button>
                <button @click="onColorChange('green')" class="color-btn green-btn">Verde</button>
                <button @click="onColorChange('blue')" class="color-btn blue-btn">Azul</button>
            </div>
            
            <div class="color-description" v-html="currentColors.description"></div>

            <!-- Outer square -->
            <div 
                class="square"
                :style="{
                    backgroundColor: currentColors.squareColor,
                    width: squareSize + 'px',
                    height: squareSize + 'px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }"
            >
                <!-- Middle square -->
                <div
                    class="middle-container"
                    :style="{
                        backgroundColor: currentColors.middleColor,
                        width: middleSize + 'px',
                        height: middleSize + 'px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }"
                >
                    <div 
                        class="inner-container"
                        :style="{
                            backgroundColor: currentColors.innerSquareColor,
                            width: innerSize + 'px',
                            height: innerSize + 'px'
                        }"
                    >
                        <canvas ref="canvas" class="stripe-canvas"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        this.drawStripes();
        this.resizeObserver = new ResizeObserver(this.drawStripes);
        this.resizeObserver.observe(this.$refs.canvas);
    },
    methods: {
        onColorChange(color) {
            this.selectedColor = color;
            this.$nextTick(this.drawStripes);
        },
        drawStripes() {
            const canvas = this.$refs.canvas;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = this.innerSize;
            canvas.height = this.innerSize;

            let rgb = null;
            if (this.selectedColor === 'red') rgb = [255, 0, 0];
            else if (this.selectedColor === 'green') rgb = [0, 255, 0];
            else if (this.selectedColor === 'blue') rgb = [0, 0, 255];

            if (rgb) {
                const colors = [rgb, [0, 0, 0]];

                for (let y = 0; y < canvas.height; y++) {
                    const color = colors[y % colors.length];
                    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    ctx.fillRect(0, y, canvas.width, 1);
                }
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }
});