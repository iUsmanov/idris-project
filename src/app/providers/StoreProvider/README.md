## Стейт-менеджмент

Стейт-менеджмент в данном проекте это одна из самых сложных тем.
В качестве стейт-менеджера в проекте используется Redux/toolkit.

О том, как настроен Redux в данном проекте, вы можете читать в следующих файлах:

-  [store.ts](/src/app/providers/StoreProvider/config/store.ts)
-  [StoreProvider.tsx](/src/app/providers/StoreProvider/components/StoreProvider.tsx)
-  [useDynamicModule.ts](/src/shared/lib/hooks/useDynamicModule/useDynamicModule.ts)
-  [StateSchema.ts](/src/app/providers/StoreProvider/config/StateSchema.ts)
-  [reducerManager.ts](/src/app/providers/StoreProvider/config/reducerManager.ts)

---

По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts), а также [Axios](/src/shared/api/api.ts)
