// Relacionamentos entre os Models
import { areaConhecimentoModel } from "./areaConhecimentoModel.js";
import { diarioBimestralModel } from "./diarioBimestralModel.js";
import { midiaModel } from "./midiasModel.js";
import { projetoTrabalhoModel } from "./projetoTrabalhoModel.js";
import { reflexaoAnualModel } from "./reflexaoAnualModel.js";
import { usuarioModel } from "./usuarioModel.js";

usuarioModel.hasMany(projetoTrabalhoModel, { foreignKey: "id_usuario" });
projetoTrabalhoModel.belongsTo(usuarioModel, { foreignKey: "id_usuario" });

usuarioModel.hasMany(diarioBimestralModel, { foreignKey: "id_usuario" });
diarioBimestralModel.belongsTo(usuarioModel, { foreignKey: "id_usuario" });

usuarioModel.hasMany(reflexaoAnualModel, { foreignKey: "id_usuario" });
reflexaoAnualModel.belongsTo(usuarioModel, { foreignKey: "id_usuario" });




areaConhecimentoModel.hasMany(projetoTrabalhoModel, { foreignKey: "id_area" });
projetoTrabalhoModel.belongsTo(areaConhecimentoModel, { foreignKey: "id_area" });

areaConhecimentoModel.hasMany(diarioBimestralModel, { foreignKey: "id_area" });
diarioBimestralModel.belongsTo(areaConhecimentoModel, { foreignKey: "id_area" });

areaConhecimentoModel.hasMany(reflexaoAnualModel, { foreignKey: "id_area" });
reflexaoAnualModel.belongsTo(areaConhecimentoModel, { foreignKey: "id_area" });




projetoTrabalhoModel.hasMany(midiaModel, { foreignKey: "id_projeto", as: "midias" });
midiaModel.belongsTo(projetoTrabalhoModel, { foreignKey: "id_projeto" });

export {
  usuarioModel,
  areaConhecimentoModel,
  projetoTrabalhoModel,
  midiaModel,
  diarioBimestralModel,
  reflexaoAnualModel
};

