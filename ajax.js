document.getElementById('formCostos').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const getValue = id => parseFloat(document.getElementById(id).value) || 0;

    // Datos de Cédula 1
    const litros_mp = getValue('litros_mp');
    const horas_mo = getValue('horas_mo');
    const horas_maquina = getValue('horas_maquina');
    const costo_mp = getValue('costo_mp');
    const costo_mo = getValue('costo_mo');
    const costo_maquina = getValue('costo_maquina');
    const cargos_fijos_por_pieza = getValue('cargos_fijos_por_pieza');
    const unidades_termi = getValue('unidades_termi');
    const unidades_vendi = getValue('unidades_vendi');
    const requerimiento_mpd = getValue('requerimiento_mpd');
    const requerimiento_mod = getValue('requerimiento_mod');
    const requerimiento_civ = getValue('requerimiento_civ');
    const requerimiento_cif = getValue('requerimiento_cif');
    const produccion_proceso = getValue('produccion_proceso');
    const real_mp = getValue('real_mp');
    const real_mo = getValue('real_mo');
    const real_ci = getValue('real_ci');

    // Cálculos de Cédula 1
    const materia_prima = litros_mp * costo_mp;
    const mano_obra = horas_mo * costo_mo;
    const cargos_indirectos = horas_maquina * (costo_maquina + cargos_fijos_por_pieza);
    const total_costo_estandar = materia_prima + mano_obra + cargos_indirectos;

    // Cálculos de Cédula 2
    const costo_mpd = requerimiento_mpd * costo_mp;
    const costo_mod = requerimiento_mod * costo_mo;
    const costo_civ = requerimiento_civ * costo_maquina;
    const costo_cif = requerimiento_cif * cargos_fijos_por_pieza;
    const suma_total_cedula_2 = costo_mpd + costo_mod + costo_civ + costo_cif;

    // Cálculos de Cédula 3
    const costo_proceso_mpd = litros_mp * produccion_proceso * costo_mp;
    const costo_proceso_mod = horas_mo * produccion_proceso * costo_mo;
    const costo_proceso_civ = horas_maquina * produccion_proceso * costo_maquina;
    const costo_proceso_cif = horas_maquina * produccion_proceso * cargos_fijos_por_pieza;
    const suma_total_cedula_3 = costo_proceso_mpd + costo_proceso_mod + costo_proceso_civ + costo_proceso_cif;

    // Cálculos de Cédula 4 (Desviaciones)
    const desviacion_mp = real_mp - materia_prima;
    const desviacion_mo = real_mo - mano_obra;
    const desviacion_ci = real_ci - cargos_indirectos;
    const desviacion_mp_tipo = desviacion_mp >= 0 ? 'Desfavorable' : 'Favorable';
    const desviacion_mo_tipo = desviacion_mo >= 0 ? 'Desfavorable' : 'Favorable';
    const desviacion_ci_tipo = desviacion_ci >= 0 ? 'Desfavorable' : 'Favorable';

    // Cédula 5 (Valoración de la Producción Terminada)
    const valoracion_produccion_terminada = unidades_termi * total_costo_estandar;

    // Cédula 6 (Valoración de Inventario Final)
    const inventario_final = (unidades_termi - unidades_vendi) * total_costo_estandar;

    // Mostrar resultados
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h3>Resultados:</h3>
        <h4>Cédula 1: Costo Estándar</h4>
        <p>Materia Prima: $${materia_prima.toFixed(2)}</p>
        <p>Mano de Obra: $${mano_obra.toFixed(2)}</p>
        <p>Cargos Indirectos: $${cargos_indirectos.toFixed(2)}</p>
        <p><strong>Total Costo Estándar: $${total_costo_estandar.toFixed(2)}</strong></p>

        <h4>Cédula 2: Requerimientos</h4>
        <p>Costo MPD: $${costo_mpd.toFixed(2)}</p>
        <p>Costo MOD: $${costo_mod.toFixed(2)}</p>
        <p>Costo CIV: $${costo_civ.toFixed(2)}</p>
        <p>Costo CIF: $${costo_cif.toFixed(2)}</p>
        <p><strong>Suma Total Cédula 2: $${suma_total_cedula_2.toFixed(2)}</strong></p>

        <h4>Cédula 3: Costo de Proceso</h4>
        <p>Costo Proceso MPD: $${costo_proceso_mpd.toFixed(2)}</p>
        <p>Costo Proceso MOD: $${costo_proceso_mod.toFixed(2)}</p>
        <p>Costo Proceso CIV: $${costo_proceso_civ.toFixed(2)}</p>
        <p>Costo Proceso CIF: $${costo_proceso_cif.toFixed(2)}</p>
        <p><strong>Suma Total Cédula 3: $${suma_total_cedula_3.toFixed(2)}</strong></p>

        <h4>Cédula 4: Desviaciones</h4>
        <p>Desviación MP: $${desviacion_mp.toFixed(2)} (${desviacion_mp_tipo})</p>
        <p>Desviación MO: $${desviacion_mo.toFixed(2)} (${desviacion_mo_tipo})</p>
        <p>Desviación CI: $${desviacion_ci.toFixed(2)} (${desviacion_ci_tipo})</p>

        <h4>Cédula 5: Valoración de la Producción Terminada</h4>
        <p>Valoración de la producción terminada: $${valoracion_produccion_terminada.toFixed(2)}</p>

        <h4>Cédula 6: Valoración de Inventario Final</h4>
        <p>Valoración de Inventario Final: $${inventario_final.toFixed(2)}</p>
    `;
});
