import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => setLocation('/')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </button>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            Política de Privacidad
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Respetando lo establecido en la legislación vigente, Nash Marketing Labs se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Leyes que incorpora esta política de privacidad</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Esta política de privacidad está adaptada a la normativa española y europea vigente en materia de protección de datos personales en internet. En concreto, la misma respeta las siguientes normas:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD).</li>
                <li>La Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).</li>
                <li>El Real Decreto 1720/2007, de 21 de diciembre, por el que se aprueba el Reglamento de desarrollo de la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal (RDLOPD).</li>
                <li>La Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Identidad del responsable del tratamiento de los datos personales</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El responsable del tratamiento de los datos personales recogidos es: <strong>NASH MARKETING LABS S.L.</strong>, provista de NIF: <strong>B06783427</strong>. Sus datos de contacto son los siguientes:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li><strong>Dirección:</strong> C/ Maria Moliner 2, Esc.1, 2º</li>
                <li><strong>Email de contacto:</strong> enrique@ads4startups.com</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Registro de Datos de Carácter Personal</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                En cumplimiento de lo establecido en el RGPD y la LOPD-GDD, le informamos que los datos personales recabados por Nash Marketing Labs, mediante los formularios extendidos en sus páginas quedarán incorporados y serán tratados en nuestro fichero con el fin de poder facilitar, agilizar y cumplir los compromisos establecidos entre Nash Marketing Labs y el Usuario o el mantenimiento de la relación que se establezca en los formularios que este rellene, o para atender una solicitud o consulta del mismo.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Principios aplicables al tratamiento de los datos personales</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El tratamiento de los datos personales del Usuario se someterá a los siguientes principios recogidos en el artículo 5 del RGPD:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li><strong>Principio de licitud, lealtad y transparencia:</strong> se requerirá en todo momento el consentimiento del Usuario previa información completamente transparente de los fines para los cuales se recogen los datos personales.</li>
                <li><strong>Principio de limitación de la finalidad:</strong> los datos personales serán recogidos con fines determinados, explícitos y legítimos.</li>
                <li><strong>Principio de minimización de datos:</strong> los datos personales recogidos serán únicamente los estrictamente necesarios en relación con los fines para los que son tratados.</li>
                <li><strong>Principio de exactitud:</strong> los datos personales deben ser exactos y estar siempre actualizados.</li>
                <li><strong>Principio de limitación del plazo de conservación:</strong> los datos personales solo serán mantenidos de forma que se permita la identificación del Usuario durante el tiempo necesario para los fines de su tratamiento.</li>
                <li><strong>Principio de integridad y confidencialidad:</strong> los datos personales serán tratados de manera que se garantice su seguridad y confidencialidad.</li>
                <li><strong>Principio de responsabilidad proactiva:</strong> el Responsable del tratamiento será responsable de asegurar que los principios anteriores se cumplen.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Derechos derivados del tratamiento de los datos personales</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El Usuario tiene sobre Nash Marketing Labs y podrá ejercer los siguientes derechos reconocidos en el RGPD:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li><strong>Derecho de acceso:</strong> Es el derecho del Usuario a obtener confirmación de si Nash Marketing Labs está tratando o no sus datos personales y, en caso afirmativo, obtener información sobre sus datos concretos de carácter personal.</li>
                <li><strong>Derecho de rectificación:</strong> Es el derecho del Usuario a que se modifiquen sus datos personales que resulten ser inexactos o, teniendo en cuenta los fines del tratamiento, incompletos.</li>
                <li><strong>Derecho de supresión ("el derecho al olvido"):</strong> Es el derecho del Usuario a obtener la supresión de sus datos personales cuando estos ya no sean necesarios para los fines para los cuales fueron recogidos.</li>
                <li><strong>Derecho a la limitación del tratamiento:</strong> Es el derecho del Usuario a limitar el tratamiento de sus datos personales.</li>
                <li><strong>Derecho a la portabilidad de los datos:</strong> El Usuario tendrá derecho a recibir sus datos personales en un formato estructurado, de uso común y lectura mecánica.</li>
                <li><strong>Derecho de oposición:</strong> Es el derecho del Usuario a que no se lleve a cabo el tratamiento de sus datos de carácter personal o se cese el tratamiento de los mismos.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Para ejercer estos derechos, puede dirigirse a: <strong>enrique@ads4startups.com</strong>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Secreto y seguridad de los datos personales</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nash Marketing Labs se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos, de forma que se garantice la seguridad de los datos de carácter personal y se evite la destrucción, pérdida o alteración accidental o ilícita de datos personales.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Reclamaciones ante la autoridad de control</h2>
              <p className="text-muted-foreground leading-relaxed">
                En caso de que el Usuario considere que existe un problema o infracción de la normativa vigente en la forma en la que se están tratando sus datos personales, tendrá derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="http://www.agpd.es" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">www.agpd.es</a>).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Aceptación y cambios en esta Política de Privacidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Es necesario que el Usuario haya leído y esté conforme con las condiciones sobre la protección de datos de carácter personal contenidas en esta Política de Privacidad. Nash Marketing Labs se reserva el derecho a modificar su Política de Privacidad, de acuerdo a su propio criterio, o motivado por un cambio legislativo.
              </p>
            </section>

            <div className="bg-muted/30 rounded-2xl p-8 mt-12">
              <p className="text-sm text-muted-foreground">
                <strong>Última actualización:</strong> Esta Política de Privacidad fue actualizada para adaptarse al Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD) y a la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
