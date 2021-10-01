import { PermissionSubject, PermissionAction } from "../common/globals";

import {
    fasUserSecret,
    fasCropAlt,
    fasSeedling,
    fasBookOpen,
    fasPlusSquare,
    fasPenSquare,
    fasTrashAlt,
    fabNutritionix,
    fasTractor,
    fasListAlt,
} from "@quasar/extras/fontawesome-v5";

export const permissionTree = [
    {
        label: "РАЗРЕШЕНИЯ ДЛЯ РОЛИ",
        header: "root",
        children: 
        [
            {
                label: "Администрирование",
                id: PermissionSubject.administration,
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
                id: PermissionSubject.cropRotation,
                icon: fasCropAlt,
                children: [
                    {
                        label: "Культура",
                        id: PermissionSubject.crop,
                        icon: fasSeedling,
                        children: [
                            {
                                label: "Просмотр",
                                id: PermissionAction.read + PermissionSubject.crop,
                                icon: fasBookOpen
                            },
                            {
                                label: "Создание",
                                id: PermissionAction.create + PermissionSubject.crop,
                                icon: fasPlusSquare
                            },
                            {
                                label: "Редактирование",
                                id: PermissionAction.update + PermissionSubject.crop,
                                icon: fasPenSquare
                            },
                            {
                                label: "Удаление",
                                id: PermissionAction.delete + PermissionSubject.crop,
                                icon: fasTrashAlt
                            }
                        ]
                    },
                    {
                        label: "Вариант выращивания",
                        id: PermissionSubject.grow,
                        icon: fabNutritionix,
                        children: [
                            {
                                label: "Просмотр",
                                id: PermissionAction.read + PermissionSubject.grow,
                                icon: fasBookOpen
                            },
                            {
                                label: "Создание",
                                id: PermissionAction.create + PermissionSubject.grow,
                                icon: fasPlusSquare
                            },
                            {
                                label: "Редактирование",
                                id: PermissionAction.update + PermissionSubject.grow,
                                icon: fasPenSquare
                            },
                            {
                                label: "Удаление",
                                id: PermissionAction.delete + PermissionSubject.grow,
                                icon: fasTrashAlt
                            }
                        ]
                    },
                    
                ]
            },
            {
                label: "Техника",
                id: PermissionSubject.car,
                icon: fasTractor,
                children: [
                    {
                        label: "Просмотр",
                        id: PermissionAction.read + PermissionSubject.car,
                        icon: fasBookOpen
                    },
                    {
                        label: "Создание",
                        id: PermissionAction.create + PermissionSubject.car,
                        icon: fasPlusSquare
                    },
                    {
                        label: "Редактирование",
                        id: PermissionAction.update + PermissionSubject.car,
                        icon: fasPenSquare
                    },
                    {
                        label: "Удаление",
                        id: PermissionAction.delete + PermissionSubject.car,
                        icon: fasTrashAlt
                    }
                ]
            },
            {
                label: "Учётный лист",
                id: PermissionSubject.accountList,
                icon: fasListAlt,
                children: [
                    {
                        label: "Просмотр",
                        id: PermissionAction.read + PermissionSubject.accountList,
                        icon: fasBookOpen
                    },
                    {
                        label: "Создание",
                        id: PermissionAction.create + PermissionSubject.accountList,
                        icon: fasPlusSquare
                    },
                    {
                        label: "Редактирование",
                        id: PermissionAction.update + PermissionSubject.accountList,
                        icon: fasPenSquare
                    },
                    {
                        label: "Удаление",
                        id: PermissionAction.delete + PermissionSubject.accountList,
                        icon: fasTrashAlt
                    }
                ]
            }
        ]
    }
]