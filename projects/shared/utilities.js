

function shade(color, shade, fade) {
    function constrainToUnit(v) {
        return Math.min(Math.max(v, 0), 1);
    }
    var s1 = this.s;
    var h1 = this.h;
    var b1 = this.b;
    var a1 = this.a;

    if (shade !== undefined) {
        if (shade > 0) {
            s1 = this.constrainToUnit(s1 - shade * (s1));
            b1 = this.constrainToUnit(b1 + shade * (1 - b1));
        } else {
            s1 = this.constrainToUnit(s1 - shade * (1 - s1));
            b1 = this.constrainToUnit(b1 + shade * (b1));
        }

        h1 = (h1 + -.06 * shade + 1) % 1;
    }

    // Increase (or decrease) the alpha for this
    if (fade !== undefined) {
        if (fade < 0) {
            a1 = this.constrainToUnit(a1 * (1 + fade));
        } else {
            a1 = this.constrainToUnit((1 - a1) * fade + a1);
        }
    }

    return (h1, s1, b1, a1);
}