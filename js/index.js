const pensiones_container = document.getElementById("pensiones")

var images = ["assets/pension-frente.jpg", "assets/pension-dentro.jpg", "assets/pension-dentro-cuarto.jpg"];

let indexes = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch("datos.json")
    .then(response => response.json())
    .then(datos => {
        fillPensiones(datos.pensiones);
    })
    .catch(error => alert(error));
});

function fillPensiones(pensiones) {
    for (let i = 0; i < pensiones.length; i++) {
        create_pension_card(pensiones[i].tipo, pensiones[i].precio, i);
        indexes.push(0);
        arrows_functionalities(i);
    }
}

function create_pension_card(type, price, i) {
    // contendor de pension
    div_pension = create_etiqueta("div", "-", "pension");
    pensiones_container.appendChild(div_pension);
    div_pension.appendChild(create_div_image(i));
    div_pension.appendChild(create_div_datos(type, price));
    div_pension.appendChild(create_div_icons());
}

function create_etiqueta(etiqueta_str, id = "", clase = "") {
    let etiqueta = document.createElement(etiqueta_str);
    etiqueta.id = id;
    etiqueta.className = clase;
    return etiqueta;
}

function create_div_image(i) {
    div_imagen = create_etiqueta("div", "-", "div-pension");
    
    const prevArrow = create_etiqueta("a", `prev-arrow-${i + 1}`, "-");
    prevArrow.href = "#";
    prevArrow.appendChild(create_etiqueta("i", "", "bi bi-arrow-left-short"))
    div_imagen.appendChild(prevArrow)

    const img = create_etiqueta("img", `img-pension-${i + 1}`);
    img.src = "assets/pension-frente.jpg";
    img.alt = "Imagen de pensión";
    img.classList.add("imagen-pension");
    div_imagen.appendChild(img);

    const nextArrow = create_etiqueta("a", `next-arrow-${i + 1}`, "-");
    nextArrow.href = "#";
    nextArrow.appendChild(create_etiqueta("i", "", "bi bi-arrow-right-short"))
    div_imagen.appendChild(nextArrow);

    return div_imagen;
}

function create_div_datos(type, price) {
    div_datos = create_etiqueta("div", "-", "datos");
    
    const tipo = create_etiqueta("p", "-", "-");
    tipo.textContent = `${type}`;
    div_datos.appendChild(tipo);
    
    const precio = create_etiqueta("p", "-", "-");
    precio.textContent = `$ ${price}`;
    div_datos.appendChild(precio);
    
    return div_datos;
}

function arrows_functionalities(i) {
    var next = document.getElementById(`next-arrow-${i + 1}`);
    var prev = document.getElementById(`prev-arrow-${i + 1}`);
    var img = document.getElementById(`img-pension-${i + 1}`);

    next.addEventListener("click", function(event) {
        event.preventDefault();
        indexes[i] = (indexes[i] + 1) % images.length;
        updateImage(indexes[i]);
    });
    
    prev.addEventListener("click", function(event) {
        event.preventDefault();
        if (indexes[i] == 0) {
            indexes[i] = 2;
        } else {
            indexes[i] = (indexes[i] - 1) % images.length;
        }
        updateImage(indexes[i]);
    });
    function updateImage(i) {
        img.src = images[i];
    }
}

function create_div_icons() {
    div_buttons = create_etiqueta("div", "-", "iconos");

    const icons = ["calendar", "geo-alt", "bookmark", "info-circle", "star"];
    icons.forEach(icon => {
        a = create_etiqueta("a", "-", "-");
        a.href = "#";
        a.appendChild(create_etiqueta("i", "-", `bi bi-${icon}`))
        div_buttons.appendChild(a);
    });

    return div_buttons;
}




