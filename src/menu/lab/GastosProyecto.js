import React from 'react';

import GenericSelector from '../../components/GenericSelector';
import Service from "../../service/Service";

export default class GastosProyecto extends React.Component {

    state = {
        gastos: [],
        mis_gastos: []
    };

    async componentWillMount() {
        const service = new Service();

        const gastos = await service.get("/api/gasto/all");

        this.setState({
            gastos
        });
    }

    render() {
        return (
            <div>
                <GenericSelector
                    enabled={true}
                    onSelect={
                        (id, proyecto) => {
                            const mis_gastos = this.state.gastos.filter(gasto => {
                                return gasto.proyecto.id === id;
                            });

                            console.log(mis_gastos);

                            this.setState({
                                mis_gastos
                            });
                        }
                    }
                    dataSource={
                        async () => {
                            const service = new Service();
                            const proyectos = await service.get("/api/proyecto/all");

                            return proyectos.map(proyecto => {
                                return {
                                    id: proyecto.id,
                                    label: proyecto.nombre,
                                    proyecto
                                };
                            });
                        }
                    }
                />
                <p>{`Gastos del proyecto: ${this.state.mis_gastos.length}`}</p>
                <p>{`Suma de montos: ${this.state.mis_gastos.reduce((p, c) => p + c.monto, 0)}`}</p>
            </div>
        );
    }

}