# Lex Contemporánea


Esta aplicación permite consultar de manera rápida y sencilla las disposiciones y anuncios que se publican diariamente en el **BOE (Boletín Oficial del Estado)**. 
Tiene el propósito de facilitar la vida de opositores, estudiantes de derecho y profesionales que necesiten un seguimiento diario de ellas.


## Objetivo del proyecto


El objetivo principal es crear un **prototipo funcional** en una JAM con una duración de tres horas. 
En dicha aplicación se muestran datos reales de la API del BOE. Se busca priorizar la claridad y la mantenibilidad teniendo en cuenta los principios SOLID y los patrones de diseño.

Posteriormente, se tiene pensado el ampliarla para integrar la **legislación consolidada**, ofreciendo la versión vigente de las normas; 
ya que realmente no se busca que sea una versión final, sino algo que se pueda usar como base para futuras actualizaciones.


## Dirección oficial de la obtención de los datos


- **<https://www.boe.es/datosabiertos/api/api.php>**


## Explicación


La motivación de esta aplicación surge de un problema habitual en el acceso a la información jurídica: los documentos oficiales, 
aunque públicos, no están pensados para una lectura ágil ni para una consulta rápida.

En el caso del BOE, el usuario debe recorrer textos extensos, localizar referencias cruzadas a otras normas y contextualizar la información por su cuenta, 
lo que dificulta el seguimiento diario de las publicaciones.


## Justificación


Para la información legislativa se ha optado por utilizar la API oficial del BOE, en concreto el endpoint del sumario diario.


Esta decisión responde a una elección técnica consciente. Para un prototipo desarrollado en el contexto de una JAM, 
el sumario permite obtener información estructurada de forma inmediata, facilitando su tratamiento, visualización y filtrado en una primera iteración funcional.


La legislación consolidada ofrece un valor jurídico mayor, al reflejar el texto vigente y actualizado de las normas,
pero requiere un procesamiento técnico más complejo que excede el alcance de un prototipo de cuatro horas.


Una vez validada la funcionalidad básica mediante el sumario, el proyecto queda preparado para evolucionar
hacia la integración de la legislación consolidada como siguiente paso natural.


## Componentes


- **responseTestComponent**: componente básico para las pruebas del endpoint


## Modelos


- **BOE**: modelo para la información legislativa obtenida del BOE


- **Law**: modelo para la información concreta de una norma/ley


- **LawType**: en caso de agruparlas por tipos (Ley Orgánica, Decreto, Orden) con su propia lógica


## Servicios (son orientativos)


- **dateQueryService**: consulta por fecha de publicación y entrada en vigor


- **getSumaryService**: obtención del sumario diario completo


- **presetFiltersService**: filtros predefinidos para búsquedas (pueden aparecer en píldoras por ejemplo). Creo que, de momento, si no hace falta para ningún filtro o cosa curiosa; creo que es mejor no complicarse. De todas formas, a veces sin quererlo, el contexto lo requiere


- **customizedSearchService**: búsqueda por palabra clave, ministerio o tipo de norma


- **itemSearchService**: obtención de un ítem específico del sumario


- **statisticsService**: obtención de estadísticas relacionadas con el sumario

## Tipos de norma (TODOS):

Ley

Real Decreto

Orden

Resolución

Acuerdo

Circular

Instrucción

Decreto

Reglamento

Corrección de errores

Convocatoria

Anuncio

Extracto

Acuerdo de Consejo de Ministros

Acuerdo del Consejo de Estado

Acuerdo del Congreso / Senado

Orden Ministerial

Orden de la Comunidad Autónoma (cuando aplica)

Proposición de Ley (menos común en BOE sumario)

Proyecto de Ley (cuando aparece)

## Tipos de norma:

Ley

Real Decreto

Decreto

Reglamento

Orden

Instrucción

Resolución

Circular

Acuerdo

Orden Ministerial