import {
    fasUserSecret,
    fasCropAlt,
    fasSeedling,
    fasBookOpen,
    fasPlusSquare,
    fasPenSquare,
    fasTrashAlt,
    fabNutritionix
} from "@quasar/extras/fontawesome-v5";

export const getPermissionTree = (app) => {
    return [
        {
            label: "Администрирование",
            id: app.PermissionSubject.administration,
            icon: fasUserSecret,
            // children: [
            //     {
            //         label: "adm",
            //         icon:fasBookOpen
            //     }
            // ]
        },
        {
            label: "Севооборот",
            id: app.PermissionSubject.cropRotation,
            icon: fasCropAlt,
            children: [
                {
                    label: "Культура",
                    id: app.PermissionSubject.crop,
                    icon: fasSeedling,
                    children: [
                        {
                            label: "Просмотр",
                            id: app.PermissionAction.read + app.PermissionSubject.crop,
                            icon: fasBookOpen
                        },
                        {
                            label: "Создание",
                            id: app.PermissionAction.create + app.PermissionSubject.crop,
                            icon: fasPlusSquare
                        },
                        {
                            label: "Редактирование",
                            id: app.PermissionAction.update + app.PermissionSubject.crop,
                            icon: fasPenSquare
                        },
                        {
                            label: "Удаление",
                            id: app.PermissionAction.delete + app.PermissionSubject.crop,
                            icon: fasTrashAlt
                        }
                    ]
                },
                {
                    label: "Вариант выращивания",
                    id: app.PermissionSubject.grow,
                    icon: fabNutritionix,
                    children: [
                        {
                            label: "Просмотр",
                            id: app.PermissionAction.read + app.PermissionSubject.grow,
                            icon: fasBookOpen
                        },
                        {
                            label: "Создание",
                            id: app.PermissionAction.create + app.PermissionSubject.grow,
                            icon: fasPlusSquare
                        },
                        {
                            label: "Редактирование",
                            id: app.PermissionAction.update + app.PermissionSubject.grow,
                            icon: fasPenSquare
                        },
                        {
                            label: "Удаление",
                            id: app.PermissionAction.delete + app.PermissionSubject.grow,
                            icon: fasTrashAlt
                        }
                    ]
                },
                
            ]
        }
    ]
};