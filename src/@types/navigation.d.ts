import { OrderDTO, OrderProps, OrderWithNotation } from "../dtos/OrderDTO";
import { UserInfoDTO } from "../dtos/UserInfoDTO";
import { DataProps } from "../screens/SharedElementExample/components/ListScreen";
import {AgricolaAPITypes} from "../services/api";
import { OrderMaintenanceProps } from "../utils/handleOrdersMaintenance";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Detail: {item: DataProps},
        }
    }
}