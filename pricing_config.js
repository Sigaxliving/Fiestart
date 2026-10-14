/**
 * VIDEO MANIA - TABULADOR DE PRECIOS PRIVADO (POR SEGUNDO)
 * Este archivo centraliza la configuración de costos.
 * Modifica estos valores para ajustar las tarifas del cotizador interactivo.
 */

const VIDEO_PRICING_TABLE = {
    // Costo base por segundo de video
    costPerSecond: 1.00, // $1 USD por segundo

    // Categorías de video
    categories: {
        animations: {
            name: "Animación",
            icon: "🎨"
        },
        intros: {
            name: "Intro",
            icon: "🎬"
        },
        editions: {
            name: "Edición",
            icon: "✂️"
        },
        loops: {
            name: "Loop",
            icon: "🔄"
        }
    },

    // Multiplicadores según prioridad/velocidad de entrega
    priorityMultipliers: {
        standard: 1.00,
        express: 1.25,  // Recargo del 25%
        instant: 1.50   // Recargo del 50%
    },

    // Servicios adicionales tradicionales
    addons: {
        sound: 45,      // Diseño de Sonido y FX
        script: 60,     // Guion y Storyboard
        thumbnail: 25   // Miniatura para redes
    },

    // Especificaciones técnicas adicionales
    specifications: {
        // ¿Requiere subtítulos? (Tarifa plana)
        subtitles: 30,

        // ¿Cuenta con Identidad Gráfica?
        brandIdentity: {
            yes: 0,       // El cliente la entrega
            no: 100       // Requiere diseño de identidad
        },

        // ¿Tienen el material ya grabado?
        rawFootage: {
            yes: 0,       // El cliente entrega el metraje bruto
            no: 200       // Requiere grabación / generación de contenido de stock
        }
    }
};
