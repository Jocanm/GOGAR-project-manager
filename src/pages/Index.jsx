import React from 'react'

const Index = () => {
    return (
        <div className="w-full h-full px-7 py-16 lg:py-28 lg:pl-12">
            <h1
                className="text-2xl sm:text-4xl lg:text-6xl text-white "
            >Plataforma creada para la administración de tus proyectos. Manten un rumbo mientras palinificas, desarrollas y entregas tus <span className="text-custom-fourth">productos</span> :)</h1>


            <section className="mt-16 md:px-5">
                <ul className="lista-index md:flex justify-between">
                    <li className="flex lg:text-lg">
                        <i className="fas fa-check text-white bg-custom-fourth mb-10 p-2 h-8 rounded-full" />
                        <p>
                            Administra a tu equipo, clientes y proyectos en un mismo lugar
                        </p>
                    </li>
                    <li className="flex lg:text-lg">
                        <i className="fas fa-check text-white bg-custom-fourth mb-10 p-2 h-8 rounded-full" />
                        <p>
                            Lleva un seguimiento diario de tus proyectos, administra quienes harán parte y mantente al tanto de todos los avances.
                        </p>
                    </li>
                    <li className="flex lg:text-lg">
                        <i className="fas fa-check text-white bg-custom-fourth mb-10 p-2 h-8 rounded-full" />
                        <p>
                            Si eres estudiante ingresa e inscribete a cualquier proyecto y empieza a incluir tus propios avances.
                        </p>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Index
