class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 50;
        this.rayLength = 100;
        this.raySpread = Math.PI/2;
        this.rays = [];
        this.update(); // Initialize rays immediately
    }

    update() {
        this.#castRays();
    }

    #castRays()
    {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: this.car.x - Math.sin(rayAngle)*this.rayLength,
                y: this.car.y - Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        if (!this.rays || this.rays.length === 0) return; // Add safety check

        for (let i = 0; i < this.rayCount; i++) {
            if (!this.rays[i]) continue; // Skip if ray is undefined
            
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.stroke();
        }
    }
}

function lerp(A,B,t) {
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D) {
    const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop = (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

    if (bottom!=0) {
        const t = tTop/bottom;
        const u = uTop/bottom;
        if (t>=0 && t<=1 && u>=0 && u<=1) {
            return {
                x: lerp(A.x,B.x,t),
                y: lerp(A.y,B.y,t),
                offset: t
            }
        }
    }

    return null;
}