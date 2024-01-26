import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
    "ReadUncommitted",
    "ReadCommitted",
    "RepeatableRead",
    "Serializable",
]);

export const ActivitiesScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "logo",
    "cover",
    "union",
    "description",
    "keywords",
    "equipment",
    "health",
    "sport",
    "movement",
    "environment",
    "gender",
]);

export const ClubsScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "description",
    "logo",
    "activityId",
]);

export const LocationsScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "clubId",
    "address",
]);

export const UsersScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "username",
    "password",
    "union",
    "activities",
    "permissions",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const EnvironmentSchema = z.enum(["Both", "Indoor", "Outdoor"]);

export type EnvironmentType = `${z.infer<typeof EnvironmentSchema>}`;

export const GenderSchema = z.enum(["Neutral", "Male", "Female"]);

export type GenderType = `${z.infer<typeof GenderSchema>}`;

export const PermissionsSchema = z.enum(["Admin", "User"]);

export type PermissionsType = `${z.infer<typeof PermissionsSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACTIVITIES SCHEMA
/////////////////////////////////////////

export const ActivitiesSchema = z.object({
    environment: EnvironmentSchema,
    gender: GenderSchema,
    /**
     * The ID of the activity
     * @default {Autoincremented}
     */
    id: z.number().int(),
    /**
     * The name of the activity
     */
    name: z.string().max(255, {
        message: "Aktivitetens navn må ikke være længere end 255 tegn",
    }),
    /**
     * The logo URL of the activity
     */
    logo: z.string(),
    /**
     * The cover image URL of the activity
     */
    cover: z.string(),
    /**
     * The union of the activity
     */
    union: z.string().nullable(),
    /**
     * The description of the activity
     */
    description: z.string(),
    /**
     * The keywords of the activity
     */
    keywords: z
        .string()
        .array()
        .min(5, { message: "Der skal være mindst 5 nøgleord" })
        .max(10, { message: "Der må ikke være flere end 10 nøgleord" }),
    /**
     * The required equipment of the activity
     */
    equipment: z
        .string()
        .array()
        .max(10, { message: "Der må ikke være mere end 10 stykker udstyr" }),
    /**
     * The health benefits of the activity
     */
    health: z.string().array().max(10, {
        message: "Der må ikke være mere end 10 sundhedsmæssige fordele",
    }),
    sport: z.boolean(),
    movement: z.boolean(),
});

export type Activities = z.infer<typeof ActivitiesSchema>;

/////////////////////////////////////////
// CLUBS SCHEMA
/////////////////////////////////////////

export const ClubsSchema = z.object({
    /**
     * The ID of the club
     * @default {Autoincremented}
     */
    id: z.number().int(),
    /**
     * The name of the club
     */
    name: z.string(),
    /**
     * The description of the club
     */
    description: z.string(),
    /**
     * The logo URL of the club
     */
    logo: z.string(),
    /**
     * The activity that the club is related to
     */
    activityId: z.number().int(),
});

export type Clubs = z.infer<typeof ClubsSchema>;

/////////////////////////////////////////
// LOCATIONS SCHEMA
/////////////////////////////////////////

export const LocationsSchema = z.object({
    /**
     * The ID of the location
     */
    id: z.number().int(),
    /**
     * The name of the location
     */
    name: z.string(),
    /**
     * The club that the location is related to
     */
    clubId: z.number().int(),
    /**
     * The address of the location
     */
    address: z.string(),
});

export type Locations = z.infer<typeof LocationsSchema>;

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
    /**
     * Users can only edit the activities that they have access to, admins can create new activities.
     */
    permissions: PermissionsSchema.array(),
    id: z.number().int(),
    name: z.string(),
    username: z.string(),
    password: z.string(),
    union: z.string(),
    activities: z.number().int().array(),
});

export type Users = z.infer<typeof UsersSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACTIVITIES
//------------------------------------------------------

export const ActivitiesIncludeSchema: z.ZodType<Prisma.ActivitiesInclude> = z
    .object({
        clubs: z
            .union([z.boolean(), z.lazy(() => ClubsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => ActivitiesCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

export const ActivitiesArgsSchema: z.ZodType<Prisma.ActivitiesDefaultArgs> = z
    .object({
        select: z.lazy(() => ActivitiesSelectSchema).optional(),
        include: z.lazy(() => ActivitiesIncludeSchema).optional(),
    })
    .strict();

export const ActivitiesCountOutputTypeArgsSchema: z.ZodType<Prisma.ActivitiesCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z
                .lazy(() => ActivitiesCountOutputTypeSelectSchema)
                .nullish(),
        })
        .strict();

export const ActivitiesCountOutputTypeSelectSchema: z.ZodType<Prisma.ActivitiesCountOutputTypeSelect> =
    z
        .object({
            clubs: z.boolean().optional(),
        })
        .strict();

export const ActivitiesSelectSchema: z.ZodType<Prisma.ActivitiesSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        logo: z.boolean().optional(),
        cover: z.boolean().optional(),
        union: z.boolean().optional(),
        description: z.boolean().optional(),
        keywords: z.boolean().optional(),
        equipment: z.boolean().optional(),
        health: z.boolean().optional(),
        sport: z.boolean().optional(),
        movement: z.boolean().optional(),
        environment: z.boolean().optional(),
        gender: z.boolean().optional(),
        clubs: z
            .union([z.boolean(), z.lazy(() => ClubsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => ActivitiesCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict();

// CLUBS
//------------------------------------------------------

export const ClubsIncludeSchema: z.ZodType<Prisma.ClubsInclude> = z
    .object({
        activity: z
            .union([z.boolean(), z.lazy(() => ActivitiesArgsSchema)])
            .optional(),
        locations: z
            .union([z.boolean(), z.lazy(() => LocationsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([z.boolean(), z.lazy(() => ClubsCountOutputTypeArgsSchema)])
            .optional(),
    })
    .strict();

export const ClubsArgsSchema: z.ZodType<Prisma.ClubsDefaultArgs> = z
    .object({
        select: z.lazy(() => ClubsSelectSchema).optional(),
        include: z.lazy(() => ClubsIncludeSchema).optional(),
    })
    .strict();

export const ClubsCountOutputTypeArgsSchema: z.ZodType<Prisma.ClubsCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z.lazy(() => ClubsCountOutputTypeSelectSchema).nullish(),
        })
        .strict();

export const ClubsCountOutputTypeSelectSchema: z.ZodType<Prisma.ClubsCountOutputTypeSelect> =
    z
        .object({
            locations: z.boolean().optional(),
        })
        .strict();

export const ClubsSelectSchema: z.ZodType<Prisma.ClubsSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        description: z.boolean().optional(),
        logo: z.boolean().optional(),
        activityId: z.boolean().optional(),
        activity: z
            .union([z.boolean(), z.lazy(() => ActivitiesArgsSchema)])
            .optional(),
        locations: z
            .union([z.boolean(), z.lazy(() => LocationsFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([z.boolean(), z.lazy(() => ClubsCountOutputTypeArgsSchema)])
            .optional(),
    })
    .strict();

// LOCATIONS
//------------------------------------------------------

export const LocationsIncludeSchema: z.ZodType<Prisma.LocationsInclude> = z
    .object({
        club: z.union([z.boolean(), z.lazy(() => ClubsArgsSchema)]).optional(),
    })
    .strict();

export const LocationsArgsSchema: z.ZodType<Prisma.LocationsDefaultArgs> = z
    .object({
        select: z.lazy(() => LocationsSelectSchema).optional(),
        include: z.lazy(() => LocationsIncludeSchema).optional(),
    })
    .strict();

export const LocationsSelectSchema: z.ZodType<Prisma.LocationsSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        clubId: z.boolean().optional(),
        address: z.boolean().optional(),
        club: z.union([z.boolean(), z.lazy(() => ClubsArgsSchema)]).optional(),
    })
    .strict();

// USERS
//------------------------------------------------------

export const UsersSelectSchema: z.ZodType<Prisma.UsersSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        username: z.boolean().optional(),
        password: z.boolean().optional(),
        union: z.boolean().optional(),
        activities: z.boolean().optional(),
        permissions: z.boolean().optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ActivitiesWhereInputSchema: z.ZodType<Prisma.ActivitiesWhereInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => ActivitiesWhereInputSchema),
                    z.lazy(() => ActivitiesWhereInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => ActivitiesWhereInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => ActivitiesWhereInputSchema),
                    z.lazy(() => ActivitiesWhereInputSchema).array(),
                ])
                .optional(),
            id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
            name: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            logo: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            cover: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            union: z
                .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                .optional()
                .nullable(),
            description: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            keywords: z.lazy(() => StringNullableListFilterSchema).optional(),
            equipment: z.lazy(() => StringNullableListFilterSchema).optional(),
            health: z.lazy(() => StringNullableListFilterSchema).optional(),
            sport: z
                .union([z.lazy(() => BoolFilterSchema), z.boolean()])
                .optional(),
            movement: z
                .union([z.lazy(() => BoolFilterSchema), z.boolean()])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnumEnvironmentFilterSchema),
                    z.lazy(() => EnvironmentSchema),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => EnumGenderFilterSchema),
                    z.lazy(() => GenderSchema),
                ])
                .optional(),
            clubs: z.lazy(() => ClubsListRelationFilterSchema).optional(),
        })
        .strict();

export const ActivitiesOrderByWithRelationInputSchema: z.ZodType<Prisma.ActivitiesOrderByWithRelationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            cover: z.lazy(() => SortOrderSchema).optional(),
            union: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            keywords: z.lazy(() => SortOrderSchema).optional(),
            equipment: z.lazy(() => SortOrderSchema).optional(),
            health: z.lazy(() => SortOrderSchema).optional(),
            sport: z.lazy(() => SortOrderSchema).optional(),
            movement: z.lazy(() => SortOrderSchema).optional(),
            environment: z.lazy(() => SortOrderSchema).optional(),
            gender: z.lazy(() => SortOrderSchema).optional(),
            clubs: z
                .lazy(() => ClubsOrderByRelationAggregateInputSchema)
                .optional(),
        })
        .strict();

export const ActivitiesWhereUniqueInputSchema: z.ZodType<Prisma.ActivitiesWhereUniqueInput> =
    z
        .object({
            id: z.number().int(),
        })
        .and(
            z
                .object({
                    id: z.number().int().optional(),
                    AND: z
                        .union([
                            z.lazy(() => ActivitiesWhereInputSchema),
                            z.lazy(() => ActivitiesWhereInputSchema).array(),
                        ])
                        .optional(),
                    OR: z
                        .lazy(() => ActivitiesWhereInputSchema)
                        .array()
                        .optional(),
                    NOT: z
                        .union([
                            z.lazy(() => ActivitiesWhereInputSchema),
                            z.lazy(() => ActivitiesWhereInputSchema).array(),
                        ])
                        .optional(),
                    name: z
                        .union([
                            z.lazy(() => StringFilterSchema),
                            z.string().max(255, {
                                message:
                                    "Aktivitetens navn må ikke være længere end 255 tegn",
                            }),
                        ])
                        .optional(),
                    logo: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    cover: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    union: z
                        .union([
                            z.lazy(() => StringNullableFilterSchema),
                            z.string(),
                        ])
                        .optional()
                        .nullable(),
                    description: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    keywords: z
                        .lazy(() => StringNullableListFilterSchema)
                        .optional(),
                    equipment: z
                        .lazy(() => StringNullableListFilterSchema)
                        .optional(),
                    health: z
                        .lazy(() => StringNullableListFilterSchema)
                        .optional(),
                    sport: z
                        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
                        .optional(),
                    movement: z
                        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
                        .optional(),
                    environment: z
                        .union([
                            z.lazy(() => EnumEnvironmentFilterSchema),
                            z.lazy(() => EnvironmentSchema),
                        ])
                        .optional(),
                    gender: z
                        .union([
                            z.lazy(() => EnumGenderFilterSchema),
                            z.lazy(() => GenderSchema),
                        ])
                        .optional(),
                    clubs: z
                        .lazy(() => ClubsListRelationFilterSchema)
                        .optional(),
                })
                .strict(),
        );

export const ActivitiesOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActivitiesOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            cover: z.lazy(() => SortOrderSchema).optional(),
            union: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            keywords: z.lazy(() => SortOrderSchema).optional(),
            equipment: z.lazy(() => SortOrderSchema).optional(),
            health: z.lazy(() => SortOrderSchema).optional(),
            sport: z.lazy(() => SortOrderSchema).optional(),
            movement: z.lazy(() => SortOrderSchema).optional(),
            environment: z.lazy(() => SortOrderSchema).optional(),
            gender: z.lazy(() => SortOrderSchema).optional(),
            _count: z
                .lazy(() => ActivitiesCountOrderByAggregateInputSchema)
                .optional(),
            _avg: z
                .lazy(() => ActivitiesAvgOrderByAggregateInputSchema)
                .optional(),
            _max: z
                .lazy(() => ActivitiesMaxOrderByAggregateInputSchema)
                .optional(),
            _min: z
                .lazy(() => ActivitiesMinOrderByAggregateInputSchema)
                .optional(),
            _sum: z
                .lazy(() => ActivitiesSumOrderByAggregateInputSchema)
                .optional(),
        })
        .strict();

export const ActivitiesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActivitiesScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(
                        () => ActivitiesScalarWhereWithAggregatesInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ActivitiesScalarWhereWithAggregatesInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            OR: z
                .lazy(() => ActivitiesScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(
                        () => ActivitiesScalarWhereWithAggregatesInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ActivitiesScalarWhereWithAggregatesInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            id: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
            name: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            logo: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            cover: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            union: z
                .union([
                    z.lazy(() => StringNullableWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional()
                .nullable(),
            description: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            keywords: z.lazy(() => StringNullableListFilterSchema).optional(),
            equipment: z.lazy(() => StringNullableListFilterSchema).optional(),
            health: z.lazy(() => StringNullableListFilterSchema).optional(),
            sport: z
                .union([
                    z.lazy(() => BoolWithAggregatesFilterSchema),
                    z.boolean(),
                ])
                .optional(),
            movement: z
                .union([
                    z.lazy(() => BoolWithAggregatesFilterSchema),
                    z.boolean(),
                ])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnumEnvironmentWithAggregatesFilterSchema),
                    z.lazy(() => EnvironmentSchema),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => EnumGenderWithAggregatesFilterSchema),
                    z.lazy(() => GenderSchema),
                ])
                .optional(),
        })
        .strict();

export const ClubsWhereInputSchema: z.ZodType<Prisma.ClubsWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ClubsWhereInputSchema),
                z.lazy(() => ClubsWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ClubsWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ClubsWhereInputSchema),
                z.lazy(() => ClubsWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        logo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        activityId: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        activity: z
            .union([
                z.lazy(() => ActivitiesRelationFilterSchema),
                z.lazy(() => ActivitiesWhereInputSchema),
            ])
            .optional(),
        locations: z.lazy(() => LocationsListRelationFilterSchema).optional(),
    })
    .strict();

export const ClubsOrderByWithRelationInputSchema: z.ZodType<Prisma.ClubsOrderByWithRelationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            activityId: z.lazy(() => SortOrderSchema).optional(),
            activity: z
                .lazy(() => ActivitiesOrderByWithRelationInputSchema)
                .optional(),
            locations: z
                .lazy(() => LocationsOrderByRelationAggregateInputSchema)
                .optional(),
        })
        .strict();

export const ClubsWhereUniqueInputSchema: z.ZodType<Prisma.ClubsWhereUniqueInput> =
    z
        .object({
            id: z.number().int(),
        })
        .and(
            z
                .object({
                    id: z.number().int().optional(),
                    AND: z
                        .union([
                            z.lazy(() => ClubsWhereInputSchema),
                            z.lazy(() => ClubsWhereInputSchema).array(),
                        ])
                        .optional(),
                    OR: z
                        .lazy(() => ClubsWhereInputSchema)
                        .array()
                        .optional(),
                    NOT: z
                        .union([
                            z.lazy(() => ClubsWhereInputSchema),
                            z.lazy(() => ClubsWhereInputSchema).array(),
                        ])
                        .optional(),
                    name: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    description: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    logo: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    activityId: z
                        .union([
                            z.lazy(() => IntFilterSchema),
                            z.number().int(),
                        ])
                        .optional(),
                    activity: z
                        .union([
                            z.lazy(() => ActivitiesRelationFilterSchema),
                            z.lazy(() => ActivitiesWhereInputSchema),
                        ])
                        .optional(),
                    locations: z
                        .lazy(() => LocationsListRelationFilterSchema)
                        .optional(),
                })
                .strict(),
        );

export const ClubsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClubsOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            activityId: z.lazy(() => SortOrderSchema).optional(),
            _count: z
                .lazy(() => ClubsCountOrderByAggregateInputSchema)
                .optional(),
            _avg: z.lazy(() => ClubsAvgOrderByAggregateInputSchema).optional(),
            _max: z.lazy(() => ClubsMaxOrderByAggregateInputSchema).optional(),
            _min: z.lazy(() => ClubsMinOrderByAggregateInputSchema).optional(),
            _sum: z.lazy(() => ClubsSumOrderByAggregateInputSchema).optional(),
        })
        .strict();

export const ClubsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClubsScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => ClubsScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => ClubsScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            OR: z
                .lazy(() => ClubsScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => ClubsScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => ClubsScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            id: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
            name: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            description: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            logo: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            activityId: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
        })
        .strict();

export const LocationsWhereInputSchema: z.ZodType<Prisma.LocationsWhereInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => LocationsWhereInputSchema),
                    z.lazy(() => LocationsWhereInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => LocationsWhereInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => LocationsWhereInputSchema),
                    z.lazy(() => LocationsWhereInputSchema).array(),
                ])
                .optional(),
            id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
            name: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            clubId: z
                .union([z.lazy(() => IntFilterSchema), z.number()])
                .optional(),
            address: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            club: z
                .union([
                    z.lazy(() => ClubsRelationFilterSchema),
                    z.lazy(() => ClubsWhereInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationsOrderByWithRelationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            clubId: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
            club: z.lazy(() => ClubsOrderByWithRelationInputSchema).optional(),
        })
        .strict();

export const LocationsWhereUniqueInputSchema: z.ZodType<Prisma.LocationsWhereUniqueInput> =
    z
        .object({
            id: z.number().int(),
        })
        .and(
            z
                .object({
                    id: z.number().int().optional(),
                    AND: z
                        .union([
                            z.lazy(() => LocationsWhereInputSchema),
                            z.lazy(() => LocationsWhereInputSchema).array(),
                        ])
                        .optional(),
                    OR: z
                        .lazy(() => LocationsWhereInputSchema)
                        .array()
                        .optional(),
                    NOT: z
                        .union([
                            z.lazy(() => LocationsWhereInputSchema),
                            z.lazy(() => LocationsWhereInputSchema).array(),
                        ])
                        .optional(),
                    name: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    clubId: z
                        .union([
                            z.lazy(() => IntFilterSchema),
                            z.number().int(),
                        ])
                        .optional(),
                    address: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    club: z
                        .union([
                            z.lazy(() => ClubsRelationFilterSchema),
                            z.lazy(() => ClubsWhereInputSchema),
                        ])
                        .optional(),
                })
                .strict(),
        );

export const LocationsOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationsOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            clubId: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
            _count: z
                .lazy(() => LocationsCountOrderByAggregateInputSchema)
                .optional(),
            _avg: z
                .lazy(() => LocationsAvgOrderByAggregateInputSchema)
                .optional(),
            _max: z
                .lazy(() => LocationsMaxOrderByAggregateInputSchema)
                .optional(),
            _min: z
                .lazy(() => LocationsMinOrderByAggregateInputSchema)
                .optional(),
            _sum: z
                .lazy(() => LocationsSumOrderByAggregateInputSchema)
                .optional(),
        })
        .strict();

export const LocationsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationsScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => LocationsScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(
                            () => LocationsScalarWhereWithAggregatesInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            OR: z
                .lazy(() => LocationsScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => LocationsScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(
                            () => LocationsScalarWhereWithAggregatesInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            id: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
            name: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            clubId: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
            address: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
        })
        .strict();

export const UsersWhereInputSchema: z.ZodType<Prisma.UsersWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UsersWhereInputSchema),
                z.lazy(() => UsersWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => UsersWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UsersWhereInputSchema),
                z.lazy(() => UsersWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        username: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        password: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        union: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        activities: z.lazy(() => IntNullableListFilterSchema).optional(),
        permissions: z
            .lazy(() => EnumPermissionsNullableListFilterSchema)
            .optional(),
    })
    .strict();

export const UsersOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOrderByWithRelationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            username: z.lazy(() => SortOrderSchema).optional(),
            password: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
            activities: z.lazy(() => SortOrderSchema).optional(),
            permissions: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const UsersWhereUniqueInputSchema: z.ZodType<Prisma.UsersWhereUniqueInput> =
    z
        .object({
            id: z.number().int(),
        })
        .and(
            z
                .object({
                    id: z.number().int().optional(),
                    AND: z
                        .union([
                            z.lazy(() => UsersWhereInputSchema),
                            z.lazy(() => UsersWhereInputSchema).array(),
                        ])
                        .optional(),
                    OR: z
                        .lazy(() => UsersWhereInputSchema)
                        .array()
                        .optional(),
                    NOT: z
                        .union([
                            z.lazy(() => UsersWhereInputSchema),
                            z.lazy(() => UsersWhereInputSchema).array(),
                        ])
                        .optional(),
                    name: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    username: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    password: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    union: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    activities: z
                        .lazy(() => IntNullableListFilterSchema)
                        .optional(),
                    permissions: z
                        .lazy(() => EnumPermissionsNullableListFilterSchema)
                        .optional(),
                })
                .strict(),
        );

export const UsersOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            username: z.lazy(() => SortOrderSchema).optional(),
            password: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
            activities: z.lazy(() => SortOrderSchema).optional(),
            permissions: z.lazy(() => SortOrderSchema).optional(),
            _count: z
                .lazy(() => UsersCountOrderByAggregateInputSchema)
                .optional(),
            _avg: z.lazy(() => UsersAvgOrderByAggregateInputSchema).optional(),
            _max: z.lazy(() => UsersMaxOrderByAggregateInputSchema).optional(),
            _min: z.lazy(() => UsersMinOrderByAggregateInputSchema).optional(),
            _sum: z.lazy(() => UsersSumOrderByAggregateInputSchema).optional(),
        })
        .strict();

export const UsersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => UsersScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            OR: z
                .lazy(() => UsersScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => UsersScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            id: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
            name: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            username: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            password: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            union: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            activities: z.lazy(() => IntNullableListFilterSchema).optional(),
            permissions: z
                .lazy(() => EnumPermissionsNullableListFilterSchema)
                .optional(),
        })
        .strict();

export const ActivitiesCreateInputSchema: z.ZodType<Prisma.ActivitiesCreateInput> =
    z
        .object({
            name: z.string().max(255, {
                message: "Aktivitetens navn må ikke være længere end 255 tegn",
            }),
            logo: z.string(),
            cover: z.string(),
            union: z.string().optional().nullable(),
            description: z.string(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesCreatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesCreateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesCreatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z.boolean(),
            movement: z.boolean(),
            environment: z.lazy(() => EnvironmentSchema),
            gender: z.lazy(() => GenderSchema),
            clubs: z
                .lazy(() => ClubsCreateNestedManyWithoutActivityInputSchema)
                .optional(),
        })
        .strict();

export const ActivitiesUncheckedCreateInputSchema: z.ZodType<Prisma.ActivitiesUncheckedCreateInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string().max(255, {
                message: "Aktivitetens navn må ikke være længere end 255 tegn",
            }),
            logo: z.string(),
            cover: z.string(),
            union: z.string().optional().nullable(),
            description: z.string(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesCreatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesCreateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesCreatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z.boolean(),
            movement: z.boolean(),
            environment: z.lazy(() => EnvironmentSchema),
            gender: z.lazy(() => GenderSchema),
            clubs: z
                .lazy(
                    () =>
                        ClubsUncheckedCreateNestedManyWithoutActivityInputSchema,
                )
                .optional(),
        })
        .strict();

export const ActivitiesUpdateInputSchema: z.ZodType<Prisma.ActivitiesUpdateInput> =
    z
        .object({
            name: z
                .union([
                    z.string().max(255, {
                        message:
                            "Aktivitetens navn må ikke være længere end 255 tegn",
                    }),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            cover: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional()
                .nullable(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesUpdatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesUpdateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesUpdatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            movement: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => EnumEnvironmentFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            clubs: z
                .lazy(() => ClubsUpdateManyWithoutActivityNestedInputSchema)
                .optional(),
        })
        .strict();

export const ActivitiesUncheckedUpdateInputSchema: z.ZodType<Prisma.ActivitiesUncheckedUpdateInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string().max(255, {
                        message:
                            "Aktivitetens navn må ikke være længere end 255 tegn",
                    }),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            cover: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional()
                .nullable(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesUpdatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesUpdateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesUpdatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            movement: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => EnumEnvironmentFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            clubs: z
                .lazy(
                    () =>
                        ClubsUncheckedUpdateManyWithoutActivityNestedInputSchema,
                )
                .optional(),
        })
        .strict();

export const ActivitiesCreateManyInputSchema: z.ZodType<Prisma.ActivitiesCreateManyInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string().max(255, {
                message: "Aktivitetens navn må ikke være længere end 255 tegn",
            }),
            logo: z.string(),
            cover: z.string(),
            union: z.string().optional().nullable(),
            description: z.string(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesCreatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesCreateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesCreatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z.boolean(),
            movement: z.boolean(),
            environment: z.lazy(() => EnvironmentSchema),
            gender: z.lazy(() => GenderSchema),
        })
        .strict();

export const ActivitiesUpdateManyMutationInputSchema: z.ZodType<Prisma.ActivitiesUpdateManyMutationInput> =
    z
        .object({
            name: z
                .union([
                    z.string().max(255, {
                        message:
                            "Aktivitetens navn må ikke være længere end 255 tegn",
                    }),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            cover: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional()
                .nullable(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesUpdatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesUpdateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesUpdatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            movement: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => EnumEnvironmentFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const ActivitiesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ActivitiesUncheckedUpdateManyInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string().max(255, {
                        message:
                            "Aktivitetens navn må ikke være længere end 255 tegn",
                    }),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            cover: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional()
                .nullable(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesUpdatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesUpdateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesUpdatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            movement: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => EnumEnvironmentFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const ClubsCreateInputSchema: z.ZodType<Prisma.ClubsCreateInput> = z
    .object({
        name: z.string(),
        description: z.string(),
        logo: z.string(),
        activity: z.lazy(
            () => ActivitiesCreateNestedOneWithoutClubsInputSchema,
        ),
        locations: z
            .lazy(() => LocationsCreateNestedManyWithoutClubInputSchema)
            .optional(),
    })
    .strict();

export const ClubsUncheckedCreateInputSchema: z.ZodType<Prisma.ClubsUncheckedCreateInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            description: z.string(),
            logo: z.string(),
            activityId: z.number().int(),
            locations: z
                .lazy(
                    () =>
                        LocationsUncheckedCreateNestedManyWithoutClubInputSchema,
                )
                .optional(),
        })
        .strict();

export const ClubsUpdateInputSchema: z.ZodType<Prisma.ClubsUpdateInput> = z
    .object({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        description: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        logo: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        activity: z
            .lazy(
                () => ActivitiesUpdateOneRequiredWithoutClubsNestedInputSchema,
            )
            .optional(),
        locations: z
            .lazy(() => LocationsUpdateManyWithoutClubNestedInputSchema)
            .optional(),
    })
    .strict();

export const ClubsUncheckedUpdateInputSchema: z.ZodType<Prisma.ClubsUncheckedUpdateInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            activityId: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            locations: z
                .lazy(
                    () =>
                        LocationsUncheckedUpdateManyWithoutClubNestedInputSchema,
                )
                .optional(),
        })
        .strict();

export const ClubsCreateManyInputSchema: z.ZodType<Prisma.ClubsCreateManyInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            description: z.string(),
            logo: z.string(),
            activityId: z.number().int(),
        })
        .strict();

export const ClubsUpdateManyMutationInputSchema: z.ZodType<Prisma.ClubsUpdateManyMutationInput> =
    z
        .object({
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const ClubsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClubsUncheckedUpdateManyInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            activityId: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsCreateInputSchema: z.ZodType<Prisma.LocationsCreateInput> =
    z
        .object({
            name: z.string(),
            address: z.string(),
            club: z.lazy(() => ClubsCreateNestedOneWithoutLocationsInputSchema),
        })
        .strict();

export const LocationsUncheckedCreateInputSchema: z.ZodType<Prisma.LocationsUncheckedCreateInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            clubId: z.number().int(),
            address: z.string(),
        })
        .strict();

export const LocationsUpdateInputSchema: z.ZodType<Prisma.LocationsUpdateInput> =
    z
        .object({
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            club: z
                .lazy(
                    () =>
                        ClubsUpdateOneRequiredWithoutLocationsNestedInputSchema,
                )
                .optional(),
        })
        .strict();

export const LocationsUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationsUncheckedUpdateInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            clubId: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsCreateManyInputSchema: z.ZodType<Prisma.LocationsCreateManyInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            clubId: z.number().int(),
            address: z.string(),
        })
        .strict();

export const LocationsUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationsUpdateManyMutationInput> =
    z
        .object({
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationsUncheckedUpdateManyInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            clubId: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const UsersCreateInputSchema: z.ZodType<Prisma.UsersCreateInput> = z
    .object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
        union: z.string(),
        activities: z
            .union([
                z.lazy(() => UsersCreateactivitiesInputSchema),
                z.number().int().array(),
            ])
            .optional(),
        permissions: z
            .union([
                z.lazy(() => UsersCreatepermissionsInputSchema),
                z.lazy(() => PermissionsSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const UsersUncheckedCreateInputSchema: z.ZodType<Prisma.UsersUncheckedCreateInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            username: z.string(),
            password: z.string(),
            union: z.string(),
            activities: z
                .union([
                    z.lazy(() => UsersCreateactivitiesInputSchema),
                    z.number().int().array(),
                ])
                .optional(),
            permissions: z
                .union([
                    z.lazy(() => UsersCreatepermissionsInputSchema),
                    z.lazy(() => PermissionsSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const UsersUpdateInputSchema: z.ZodType<Prisma.UsersUpdateInput> = z
    .object({
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        username: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        password: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        union: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        activities: z
            .union([
                z.lazy(() => UsersUpdateactivitiesInputSchema),
                z.number().int().array(),
            ])
            .optional(),
        permissions: z
            .union([
                z.lazy(() => UsersUpdatepermissionsInputSchema),
                z.lazy(() => PermissionsSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const UsersUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            username: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            password: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            activities: z
                .union([
                    z.lazy(() => UsersUpdateactivitiesInputSchema),
                    z.number().int().array(),
                ])
                .optional(),
            permissions: z
                .union([
                    z.lazy(() => UsersUpdatepermissionsInputSchema),
                    z.lazy(() => PermissionsSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const UsersCreateManyInputSchema: z.ZodType<Prisma.UsersCreateManyInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            username: z.string(),
            password: z.string(),
            union: z.string(),
            activities: z
                .union([
                    z.lazy(() => UsersCreateactivitiesInputSchema),
                    z.number().int().array(),
                ])
                .optional(),
            permissions: z
                .union([
                    z.lazy(() => UsersCreatepermissionsInputSchema),
                    z.lazy(() => PermissionsSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const UsersUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersUpdateManyMutationInput> =
    z
        .object({
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            username: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            password: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            activities: z
                .union([
                    z.lazy(() => UsersUpdateactivitiesInputSchema),
                    z.number().int().array(),
                ])
                .optional(),
            permissions: z
                .union([
                    z.lazy(() => UsersUpdatepermissionsInputSchema),
                    z.lazy(() => PermissionsSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const UsersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateManyInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            username: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            password: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            activities: z
                .union([
                    z.lazy(() => UsersUpdateactivitiesInputSchema),
                    z.number().int().array(),
                ])
                .optional(),
            permissions: z
                .union([
                    z.lazy(() => UsersUpdatepermissionsInputSchema),
                    z.lazy(() => PermissionsSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
    .object({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedIntFilterSchema)])
            .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
    .object({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        mode: z.lazy(() => QueryModeSchema).optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
            .optional(),
    })
    .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            mode: z.lazy(() => QueryModeSchema).optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> =
    z
        .object({
            equals: z.string().array().optional().nullable(),
            has: z.string().optional().nullable(),
            hasEvery: z.string().array().optional(),
            hasSome: z.string().array().optional(),
            isEmpty: z.boolean().optional(),
        })
        .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
    .object({
        equals: z.boolean().optional(),
        not: z
            .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
            .optional(),
    })
    .strict();

export const EnumEnvironmentFilterSchema: z.ZodType<Prisma.EnumEnvironmentFilter> =
    z
        .object({
            equals: z.lazy(() => EnvironmentSchema).optional(),
            in: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(() => NestedEnumEnvironmentFilterSchema),
                ])
                .optional(),
        })
        .strict();

export const EnumGenderFilterSchema: z.ZodType<Prisma.EnumGenderFilter> = z
    .object({
        equals: z.lazy(() => GenderSchema).optional(),
        in: z
            .lazy(() => GenderSchema)
            .array()
            .optional(),
        notIn: z
            .lazy(() => GenderSchema)
            .array()
            .optional(),
        not: z
            .union([
                z.lazy(() => GenderSchema),
                z.lazy(() => NestedEnumGenderFilterSchema),
            ])
            .optional(),
    })
    .strict();

export const ClubsListRelationFilterSchema: z.ZodType<Prisma.ClubsListRelationFilter> =
    z
        .object({
            every: z.lazy(() => ClubsWhereInputSchema).optional(),
            some: z.lazy(() => ClubsWhereInputSchema).optional(),
            none: z.lazy(() => ClubsWhereInputSchema).optional(),
        })
        .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
    .object({
        sort: z.lazy(() => SortOrderSchema),
        nulls: z.lazy(() => NullsOrderSchema).optional(),
    })
    .strict();

export const ClubsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClubsOrderByRelationAggregateInput> =
    z
        .object({
            _count: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ActivitiesCountOrderByAggregateInputSchema: z.ZodType<Prisma.ActivitiesCountOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            cover: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            keywords: z.lazy(() => SortOrderSchema).optional(),
            equipment: z.lazy(() => SortOrderSchema).optional(),
            health: z.lazy(() => SortOrderSchema).optional(),
            sport: z.lazy(() => SortOrderSchema).optional(),
            movement: z.lazy(() => SortOrderSchema).optional(),
            environment: z.lazy(() => SortOrderSchema).optional(),
            gender: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ActivitiesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ActivitiesAvgOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ActivitiesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ActivitiesMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            cover: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            sport: z.lazy(() => SortOrderSchema).optional(),
            movement: z.lazy(() => SortOrderSchema).optional(),
            environment: z.lazy(() => SortOrderSchema).optional(),
            gender: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ActivitiesMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActivitiesMinOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            cover: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            sport: z.lazy(() => SortOrderSchema).optional(),
            movement: z.lazy(() => SortOrderSchema).optional(),
            environment: z.lazy(() => SortOrderSchema).optional(),
            gender: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ActivitiesSumOrderByAggregateInputSchema: z.ZodType<Prisma.ActivitiesSumOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
    z
        .object({
            equals: z.number().optional(),
            in: z.number().array().optional(),
            notIn: z.number().array().optional(),
            lt: z.number().optional(),
            lte: z.number().optional(),
            gt: z.number().optional(),
            gte: z.number().optional(),
            not: z
                .union([
                    z.number(),
                    z.lazy(() => NestedIntWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
            _sum: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedIntFilterSchema).optional(),
            _max: z.lazy(() => NestedIntFilterSchema).optional(),
        })
        .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional(),
            in: z.string().array().optional(),
            notIn: z.string().array().optional(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            mode: z.lazy(() => QueryModeSchema).optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedStringFilterSchema).optional(),
            _max: z.lazy(() => NestedStringFilterSchema).optional(),
        })
        .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            mode: z.lazy(() => QueryModeSchema).optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NestedStringNullableWithAggregatesFilterSchema,
                    ),
                ])
                .optional()
                .nullable(),
            _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
            _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
            _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
        })
        .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
    z
        .object({
            equals: z.boolean().optional(),
            not: z
                .union([
                    z.boolean(),
                    z.lazy(() => NestedBoolWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedBoolFilterSchema).optional(),
            _max: z.lazy(() => NestedBoolFilterSchema).optional(),
        })
        .strict();

export const EnumEnvironmentWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEnvironmentWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => EnvironmentSchema).optional(),
            in: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => NestedEnumEnvironmentWithAggregatesFilterSchema,
                    ),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumEnvironmentFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumEnvironmentFilterSchema).optional(),
        })
        .strict();

export const EnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => GenderSchema).optional(),
            in: z
                .lazy(() => GenderSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => GenderSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
        })
        .strict();

export const ActivitiesRelationFilterSchema: z.ZodType<Prisma.ActivitiesRelationFilter> =
    z
        .object({
            is: z.lazy(() => ActivitiesWhereInputSchema).optional(),
            isNot: z.lazy(() => ActivitiesWhereInputSchema).optional(),
        })
        .strict();

export const LocationsListRelationFilterSchema: z.ZodType<Prisma.LocationsListRelationFilter> =
    z
        .object({
            every: z.lazy(() => LocationsWhereInputSchema).optional(),
            some: z.lazy(() => LocationsWhereInputSchema).optional(),
            none: z.lazy(() => LocationsWhereInputSchema).optional(),
        })
        .strict();

export const LocationsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LocationsOrderByRelationAggregateInput> =
    z
        .object({
            _count: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ClubsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClubsCountOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            activityId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ClubsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ClubsAvgOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            activityId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ClubsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClubsMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            activityId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ClubsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClubsMinOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            logo: z.lazy(() => SortOrderSchema).optional(),
            activityId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ClubsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ClubsSumOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            activityId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ClubsRelationFilterSchema: z.ZodType<Prisma.ClubsRelationFilter> =
    z
        .object({
            is: z.lazy(() => ClubsWhereInputSchema).optional(),
            isNot: z.lazy(() => ClubsWhereInputSchema).optional(),
        })
        .strict();

export const LocationsCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsCountOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            clubId: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const LocationsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsAvgOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            clubId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const LocationsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            clubId: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const LocationsMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsMinOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            clubId: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const LocationsSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsSumOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            clubId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const IntNullableListFilterSchema: z.ZodType<Prisma.IntNullableListFilter> =
    z
        .object({
            equals: z.number().array().optional().nullable(),
            has: z.number().optional().nullable(),
            hasEvery: z.number().array().optional(),
            hasSome: z.number().array().optional(),
            isEmpty: z.boolean().optional(),
        })
        .strict();

export const EnumPermissionsNullableListFilterSchema: z.ZodType<Prisma.EnumPermissionsNullableListFilter> =
    z
        .object({
            equals: z
                .lazy(() => PermissionsSchema)
                .array()
                .optional()
                .nullable(),
            has: z
                .lazy(() => PermissionsSchema)
                .optional()
                .nullable(),
            hasEvery: z
                .lazy(() => PermissionsSchema)
                .array()
                .optional(),
            hasSome: z
                .lazy(() => PermissionsSchema)
                .array()
                .optional(),
            isEmpty: z.boolean().optional(),
        })
        .strict();

export const UsersCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersCountOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            username: z.lazy(() => SortOrderSchema).optional(),
            password: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
            activities: z.lazy(() => SortOrderSchema).optional(),
            permissions: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const UsersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UsersAvgOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            activities: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const UsersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            username: z.lazy(() => SortOrderSchema).optional(),
            password: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const UsersMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMinOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            username: z.lazy(() => SortOrderSchema).optional(),
            password: z.lazy(() => SortOrderSchema).optional(),
            union: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const UsersSumOrderByAggregateInputSchema: z.ZodType<Prisma.UsersSumOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            activities: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export const ActivitiesCreatekeywordsInputSchema: z.ZodType<Prisma.ActivitiesCreatekeywordsInput> =
    z
        .object({
            set: z.string().array(),
        })
        .strict();

export const ActivitiesCreateequipmentInputSchema: z.ZodType<Prisma.ActivitiesCreateequipmentInput> =
    z
        .object({
            set: z.string().array(),
        })
        .strict();

export const ActivitiesCreatehealthInputSchema: z.ZodType<Prisma.ActivitiesCreatehealthInput> =
    z
        .object({
            set: z.string().array(),
        })
        .strict();

export const ClubsCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.ClubsCreateNestedManyWithoutActivityInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema),
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema).array(),
                    z.lazy(
                        () => ClubsUncheckedCreateWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUncheckedCreateWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ClubsCreateOrConnectWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsCreateOrConnectWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => ClubsCreateManyActivityInputEnvelopeSchema)
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const ClubsUncheckedCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUncheckedCreateNestedManyWithoutActivityInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema),
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema).array(),
                    z.lazy(
                        () => ClubsUncheckedCreateWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUncheckedCreateWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ClubsCreateOrConnectWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsCreateOrConnectWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => ClubsCreateManyActivityInputEnvelopeSchema)
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
    z
        .object({
            set: z.string().optional(),
        })
        .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
    z
        .object({
            set: z.string().optional().nullable(),
        })
        .strict();

export const ActivitiesUpdatekeywordsInputSchema: z.ZodType<Prisma.ActivitiesUpdatekeywordsInput> =
    z
        .object({
            set: z.string().array().optional(),
            push: z.union([z.string(), z.string().array()]).optional(),
        })
        .strict();

export const ActivitiesUpdateequipmentInputSchema: z.ZodType<Prisma.ActivitiesUpdateequipmentInput> =
    z
        .object({
            set: z.string().array().optional(),
            push: z.union([z.string(), z.string().array()]).optional(),
        })
        .strict();

export const ActivitiesUpdatehealthInputSchema: z.ZodType<Prisma.ActivitiesUpdatehealthInput> =
    z
        .object({
            set: z.string().array().optional(),
            push: z.union([z.string(), z.string().array()]).optional(),
        })
        .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
    z
        .object({
            set: z.boolean().optional(),
        })
        .strict();

export const EnumEnvironmentFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEnvironmentFieldUpdateOperationsInput> =
    z
        .object({
            set: z.lazy(() => EnvironmentSchema).optional(),
        })
        .strict();

export const EnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenderFieldUpdateOperationsInput> =
    z
        .object({
            set: z.lazy(() => GenderSchema).optional(),
        })
        .strict();

export const ClubsUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.ClubsUpdateManyWithoutActivityNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema),
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema).array(),
                    z.lazy(
                        () => ClubsUncheckedCreateWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUncheckedCreateWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ClubsCreateOrConnectWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsCreateOrConnectWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            ClubsUpsertWithWhereUniqueWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUpsertWithWhereUniqueWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => ClubsCreateManyActivityInputEnvelopeSchema)
                .optional(),
            set: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ClubsUpdateWithWhereUniqueWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUpdateWithWhereUniqueWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            ClubsUpdateManyWithWhereWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUpdateManyWithWhereWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => ClubsScalarWhereInputSchema),
                    z.lazy(() => ClubsScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
    z
        .object({
            set: z.number().optional(),
            increment: z.number().optional(),
            decrement: z.number().optional(),
            multiply: z.number().optional(),
            divide: z.number().optional(),
        })
        .strict();

export const ClubsUncheckedUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.ClubsUncheckedUpdateManyWithoutActivityNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema),
                    z.lazy(() => ClubsCreateWithoutActivityInputSchema).array(),
                    z.lazy(
                        () => ClubsUncheckedCreateWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUncheckedCreateWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ClubsCreateOrConnectWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsCreateOrConnectWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            ClubsUpsertWithWhereUniqueWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUpsertWithWhereUniqueWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => ClubsCreateManyActivityInputEnvelopeSchema)
                .optional(),
            set: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ClubsWhereUniqueInputSchema),
                    z.lazy(() => ClubsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ClubsUpdateWithWhereUniqueWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUpdateWithWhereUniqueWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            ClubsUpdateManyWithWhereWithoutActivityInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                ClubsUpdateManyWithWhereWithoutActivityInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => ClubsScalarWhereInputSchema),
                    z.lazy(() => ClubsScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const ActivitiesCreateNestedOneWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesCreateNestedOneWithoutClubsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ActivitiesCreateWithoutClubsInputSchema),
                    z.lazy(
                        () => ActivitiesUncheckedCreateWithoutClubsInputSchema,
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(() => ActivitiesCreateOrConnectWithoutClubsInputSchema)
                .optional(),
            connect: z.lazy(() => ActivitiesWhereUniqueInputSchema).optional(),
        })
        .strict();

export const LocationsCreateNestedManyWithoutClubInputSchema: z.ZodType<Prisma.LocationsCreateNestedManyWithoutClubInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => LocationsCreateWithoutClubInputSchema),
                    z.lazy(() => LocationsCreateWithoutClubInputSchema).array(),
                    z.lazy(
                        () => LocationsUncheckedCreateWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUncheckedCreateWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => LocationsCreateOrConnectWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsCreateOrConnectWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => LocationsCreateManyClubInputEnvelopeSchema)
                .optional(),
            connect: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const LocationsUncheckedCreateNestedManyWithoutClubInputSchema: z.ZodType<Prisma.LocationsUncheckedCreateNestedManyWithoutClubInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => LocationsCreateWithoutClubInputSchema),
                    z.lazy(() => LocationsCreateWithoutClubInputSchema).array(),
                    z.lazy(
                        () => LocationsUncheckedCreateWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUncheckedCreateWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => LocationsCreateOrConnectWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsCreateOrConnectWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => LocationsCreateManyClubInputEnvelopeSchema)
                .optional(),
            connect: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const ActivitiesUpdateOneRequiredWithoutClubsNestedInputSchema: z.ZodType<Prisma.ActivitiesUpdateOneRequiredWithoutClubsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ActivitiesCreateWithoutClubsInputSchema),
                    z.lazy(
                        () => ActivitiesUncheckedCreateWithoutClubsInputSchema,
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(() => ActivitiesCreateOrConnectWithoutClubsInputSchema)
                .optional(),
            upsert: z
                .lazy(() => ActivitiesUpsertWithoutClubsInputSchema)
                .optional(),
            connect: z.lazy(() => ActivitiesWhereUniqueInputSchema).optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ActivitiesUpdateToOneWithWhereWithoutClubsInputSchema,
                    ),
                    z.lazy(() => ActivitiesUpdateWithoutClubsInputSchema),
                    z.lazy(
                        () => ActivitiesUncheckedUpdateWithoutClubsInputSchema,
                    ),
                ])
                .optional(),
        })
        .strict();

export const LocationsUpdateManyWithoutClubNestedInputSchema: z.ZodType<Prisma.LocationsUpdateManyWithoutClubNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => LocationsCreateWithoutClubInputSchema),
                    z.lazy(() => LocationsCreateWithoutClubInputSchema).array(),
                    z.lazy(
                        () => LocationsUncheckedCreateWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUncheckedCreateWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => LocationsCreateOrConnectWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsCreateOrConnectWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            LocationsUpsertWithWhereUniqueWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUpsertWithWhereUniqueWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => LocationsCreateManyClubInputEnvelopeSchema)
                .optional(),
            set: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            LocationsUpdateWithWhereUniqueWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUpdateWithWhereUniqueWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            LocationsUpdateManyWithWhereWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUpdateManyWithWhereWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => LocationsScalarWhereInputSchema),
                    z.lazy(() => LocationsScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const LocationsUncheckedUpdateManyWithoutClubNestedInputSchema: z.ZodType<Prisma.LocationsUncheckedUpdateManyWithoutClubNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => LocationsCreateWithoutClubInputSchema),
                    z.lazy(() => LocationsCreateWithoutClubInputSchema).array(),
                    z.lazy(
                        () => LocationsUncheckedCreateWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUncheckedCreateWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => LocationsCreateOrConnectWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsCreateOrConnectWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            LocationsUpsertWithWhereUniqueWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUpsertWithWhereUniqueWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => LocationsCreateManyClubInputEnvelopeSchema)
                .optional(),
            set: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => LocationsWhereUniqueInputSchema),
                    z.lazy(() => LocationsWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            LocationsUpdateWithWhereUniqueWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUpdateWithWhereUniqueWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            LocationsUpdateManyWithWhereWithoutClubInputSchema,
                    ),
                    z
                        .lazy(
                            () =>
                                LocationsUpdateManyWithWhereWithoutClubInputSchema,
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => LocationsScalarWhereInputSchema),
                    z.lazy(() => LocationsScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const ClubsCreateNestedOneWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsCreateNestedOneWithoutLocationsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ClubsCreateWithoutLocationsInputSchema),
                    z.lazy(
                        () => ClubsUncheckedCreateWithoutLocationsInputSchema,
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(() => ClubsCreateOrConnectWithoutLocationsInputSchema)
                .optional(),
            connect: z.lazy(() => ClubsWhereUniqueInputSchema).optional(),
        })
        .strict();

export const ClubsUpdateOneRequiredWithoutLocationsNestedInputSchema: z.ZodType<Prisma.ClubsUpdateOneRequiredWithoutLocationsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ClubsCreateWithoutLocationsInputSchema),
                    z.lazy(
                        () => ClubsUncheckedCreateWithoutLocationsInputSchema,
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(() => ClubsCreateOrConnectWithoutLocationsInputSchema)
                .optional(),
            upsert: z
                .lazy(() => ClubsUpsertWithoutLocationsInputSchema)
                .optional(),
            connect: z.lazy(() => ClubsWhereUniqueInputSchema).optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ClubsUpdateToOneWithWhereWithoutLocationsInputSchema,
                    ),
                    z.lazy(() => ClubsUpdateWithoutLocationsInputSchema),
                    z.lazy(
                        () => ClubsUncheckedUpdateWithoutLocationsInputSchema,
                    ),
                ])
                .optional(),
        })
        .strict();

export const UsersCreateactivitiesInputSchema: z.ZodType<Prisma.UsersCreateactivitiesInput> =
    z
        .object({
            set: z.number().array(),
        })
        .strict();

export const UsersCreatepermissionsInputSchema: z.ZodType<Prisma.UsersCreatepermissionsInput> =
    z
        .object({
            set: z.lazy(() => PermissionsSchema).array(),
        })
        .strict();

export const UsersUpdateactivitiesInputSchema: z.ZodType<Prisma.UsersUpdateactivitiesInput> =
    z
        .object({
            set: z.number().array().optional(),
            push: z.union([z.number(), z.number().array()]).optional(),
        })
        .strict();

export const UsersUpdatepermissionsInputSchema: z.ZodType<Prisma.UsersUpdatepermissionsInput> =
    z
        .object({
            set: z
                .lazy(() => PermissionsSchema)
                .array()
                .optional(),
            push: z
                .union([
                    z.lazy(() => PermissionsSchema),
                    z.lazy(() => PermissionsSchema).array(),
                ])
                .optional(),
        })
        .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
    .object({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedIntFilterSchema)])
            .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
    .object({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
            .optional(),
    })
    .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
    .object({
        equals: z.boolean().optional(),
        not: z
            .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
            .optional(),
    })
    .strict();

export const NestedEnumEnvironmentFilterSchema: z.ZodType<Prisma.NestedEnumEnvironmentFilter> =
    z
        .object({
            equals: z.lazy(() => EnvironmentSchema).optional(),
            in: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(() => NestedEnumEnvironmentFilterSchema),
                ])
                .optional(),
        })
        .strict();

export const NestedEnumGenderFilterSchema: z.ZodType<Prisma.NestedEnumGenderFilter> =
    z
        .object({
            equals: z.lazy(() => GenderSchema).optional(),
            in: z
                .lazy(() => GenderSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => GenderSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => NestedEnumGenderFilterSchema),
                ])
                .optional(),
        })
        .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
    z
        .object({
            equals: z.number().optional(),
            in: z.number().array().optional(),
            notIn: z.number().array().optional(),
            lt: z.number().optional(),
            lte: z.number().optional(),
            gt: z.number().optional(),
            gte: z.number().optional(),
            not: z
                .union([
                    z.number(),
                    z.lazy(() => NestedIntWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
            _sum: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedIntFilterSchema).optional(),
            _max: z.lazy(() => NestedIntFilterSchema).optional(),
        })
        .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
    .object({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
            .optional(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional(),
            in: z.string().array().optional(),
            notIn: z.string().array().optional(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedStringFilterSchema).optional(),
            _max: z.lazy(() => NestedStringFilterSchema).optional(),
        })
        .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NestedStringNullableWithAggregatesFilterSchema,
                    ),
                ])
                .optional()
                .nullable(),
            _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
            _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
            _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
        })
        .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
    z
        .object({
            equals: z.number().optional().nullable(),
            in: z.number().array().optional().nullable(),
            notIn: z.number().array().optional().nullable(),
            lt: z.number().optional(),
            lte: z.number().optional(),
            gt: z.number().optional(),
            gte: z.number().optional(),
            not: z
                .union([
                    z.number(),
                    z.lazy(() => NestedIntNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
    z
        .object({
            equals: z.boolean().optional(),
            not: z
                .union([
                    z.boolean(),
                    z.lazy(() => NestedBoolWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedBoolFilterSchema).optional(),
            _max: z.lazy(() => NestedBoolFilterSchema).optional(),
        })
        .strict();

export const NestedEnumEnvironmentWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEnvironmentWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => EnvironmentSchema).optional(),
            in: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => EnvironmentSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => NestedEnumEnvironmentWithAggregatesFilterSchema,
                    ),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumEnvironmentFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumEnvironmentFilterSchema).optional(),
        })
        .strict();

export const NestedEnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => GenderSchema).optional(),
            in: z
                .lazy(() => GenderSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => GenderSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
        })
        .strict();

export const ClubsCreateWithoutActivityInputSchema: z.ZodType<Prisma.ClubsCreateWithoutActivityInput> =
    z
        .object({
            name: z.string(),
            description: z.string(),
            logo: z.string(),
            locations: z
                .lazy(() => LocationsCreateNestedManyWithoutClubInputSchema)
                .optional(),
        })
        .strict();

export const ClubsUncheckedCreateWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUncheckedCreateWithoutActivityInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            description: z.string(),
            logo: z.string(),
            locations: z
                .lazy(
                    () =>
                        LocationsUncheckedCreateNestedManyWithoutClubInputSchema,
                )
                .optional(),
        })
        .strict();

export const ClubsCreateOrConnectWithoutActivityInputSchema: z.ZodType<Prisma.ClubsCreateOrConnectWithoutActivityInput> =
    z
        .object({
            where: z.lazy(() => ClubsWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => ClubsCreateWithoutActivityInputSchema),
                z.lazy(() => ClubsUncheckedCreateWithoutActivityInputSchema),
            ]),
        })
        .strict();

export const ClubsCreateManyActivityInputEnvelopeSchema: z.ZodType<Prisma.ClubsCreateManyActivityInputEnvelope> =
    z
        .object({
            data: z.union([
                z.lazy(() => ClubsCreateManyActivityInputSchema),
                z.lazy(() => ClubsCreateManyActivityInputSchema).array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const ClubsUpsertWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUpsertWithWhereUniqueWithoutActivityInput> =
    z
        .object({
            where: z.lazy(() => ClubsWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => ClubsUpdateWithoutActivityInputSchema),
                z.lazy(() => ClubsUncheckedUpdateWithoutActivityInputSchema),
            ]),
            create: z.union([
                z.lazy(() => ClubsCreateWithoutActivityInputSchema),
                z.lazy(() => ClubsUncheckedCreateWithoutActivityInputSchema),
            ]),
        })
        .strict();

export const ClubsUpdateWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUpdateWithWhereUniqueWithoutActivityInput> =
    z
        .object({
            where: z.lazy(() => ClubsWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => ClubsUpdateWithoutActivityInputSchema),
                z.lazy(() => ClubsUncheckedUpdateWithoutActivityInputSchema),
            ]),
        })
        .strict();

export const ClubsUpdateManyWithWhereWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUpdateManyWithWhereWithoutActivityInput> =
    z
        .object({
            where: z.lazy(() => ClubsScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => ClubsUpdateManyMutationInputSchema),
                z.lazy(
                    () => ClubsUncheckedUpdateManyWithoutActivityInputSchema,
                ),
            ]),
        })
        .strict();

export const ClubsScalarWhereInputSchema: z.ZodType<Prisma.ClubsScalarWhereInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => ClubsScalarWhereInputSchema),
                    z.lazy(() => ClubsScalarWhereInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => ClubsScalarWhereInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => ClubsScalarWhereInputSchema),
                    z.lazy(() => ClubsScalarWhereInputSchema).array(),
                ])
                .optional(),
            id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
            name: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            description: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            logo: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            activityId: z
                .union([z.lazy(() => IntFilterSchema), z.number()])
                .optional(),
        })
        .strict();

export const ActivitiesCreateWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesCreateWithoutClubsInput> =
    z
        .object({
            name: z.string().max(255, {
                message: "Aktivitetens navn må ikke være længere end 255 tegn",
            }),
            logo: z.string(),
            cover: z.string(),
            union: z.string().optional().nullable(),
            description: z.string(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesCreatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesCreateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesCreatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z.boolean(),
            movement: z.boolean(),
            environment: z.lazy(() => EnvironmentSchema),
            gender: z.lazy(() => GenderSchema),
        })
        .strict();

export const ActivitiesUncheckedCreateWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesUncheckedCreateWithoutClubsInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string().max(255, {
                message: "Aktivitetens navn må ikke være længere end 255 tegn",
            }),
            logo: z.string(),
            cover: z.string(),
            union: z.string().optional().nullable(),
            description: z.string(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesCreatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesCreateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesCreatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z.boolean(),
            movement: z.boolean(),
            environment: z.lazy(() => EnvironmentSchema),
            gender: z.lazy(() => GenderSchema),
        })
        .strict();

export const ActivitiesCreateOrConnectWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesCreateOrConnectWithoutClubsInput> =
    z
        .object({
            where: z.lazy(() => ActivitiesWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => ActivitiesCreateWithoutClubsInputSchema),
                z.lazy(() => ActivitiesUncheckedCreateWithoutClubsInputSchema),
            ]),
        })
        .strict();

export const LocationsCreateWithoutClubInputSchema: z.ZodType<Prisma.LocationsCreateWithoutClubInput> =
    z
        .object({
            name: z.string(),
            address: z.string(),
        })
        .strict();

export const LocationsUncheckedCreateWithoutClubInputSchema: z.ZodType<Prisma.LocationsUncheckedCreateWithoutClubInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            address: z.string(),
        })
        .strict();

export const LocationsCreateOrConnectWithoutClubInputSchema: z.ZodType<Prisma.LocationsCreateOrConnectWithoutClubInput> =
    z
        .object({
            where: z.lazy(() => LocationsWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => LocationsCreateWithoutClubInputSchema),
                z.lazy(() => LocationsUncheckedCreateWithoutClubInputSchema),
            ]),
        })
        .strict();

export const LocationsCreateManyClubInputEnvelopeSchema: z.ZodType<Prisma.LocationsCreateManyClubInputEnvelope> =
    z
        .object({
            data: z.union([
                z.lazy(() => LocationsCreateManyClubInputSchema),
                z.lazy(() => LocationsCreateManyClubInputSchema).array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const ActivitiesUpsertWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesUpsertWithoutClubsInput> =
    z
        .object({
            update: z.union([
                z.lazy(() => ActivitiesUpdateWithoutClubsInputSchema),
                z.lazy(() => ActivitiesUncheckedUpdateWithoutClubsInputSchema),
            ]),
            create: z.union([
                z.lazy(() => ActivitiesCreateWithoutClubsInputSchema),
                z.lazy(() => ActivitiesUncheckedCreateWithoutClubsInputSchema),
            ]),
            where: z.lazy(() => ActivitiesWhereInputSchema).optional(),
        })
        .strict();

export const ActivitiesUpdateToOneWithWhereWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesUpdateToOneWithWhereWithoutClubsInput> =
    z
        .object({
            where: z.lazy(() => ActivitiesWhereInputSchema).optional(),
            data: z.union([
                z.lazy(() => ActivitiesUpdateWithoutClubsInputSchema),
                z.lazy(() => ActivitiesUncheckedUpdateWithoutClubsInputSchema),
            ]),
        })
        .strict();

export const ActivitiesUpdateWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesUpdateWithoutClubsInput> =
    z
        .object({
            name: z
                .union([
                    z.string().max(255, {
                        message:
                            "Aktivitetens navn må ikke være længere end 255 tegn",
                    }),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            cover: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional()
                .nullable(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesUpdatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesUpdateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesUpdatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            movement: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => EnumEnvironmentFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const ActivitiesUncheckedUpdateWithoutClubsInputSchema: z.ZodType<Prisma.ActivitiesUncheckedUpdateWithoutClubsInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string().max(255, {
                        message:
                            "Aktivitetens navn må ikke være længere end 255 tegn",
                    }),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            cover: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            union: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional()
                .nullable(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            keywords: z
                .union([
                    z.lazy(() => ActivitiesUpdatekeywordsInputSchema),
                    z.string().array(),
                ])
                .optional(),
            equipment: z
                .union([
                    z.lazy(() => ActivitiesUpdateequipmentInputSchema),
                    z.string().array(),
                ])
                .optional(),
            health: z
                .union([
                    z.lazy(() => ActivitiesUpdatehealthInputSchema),
                    z.string().array(),
                ])
                .optional(),
            sport: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            movement: z
                .union([
                    z.boolean(),
                    z.lazy(() => BoolFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            environment: z
                .union([
                    z.lazy(() => EnvironmentSchema),
                    z.lazy(
                        () => EnumEnvironmentFieldUpdateOperationsInputSchema,
                    ),
                ])
                .optional(),
            gender: z
                .union([
                    z.lazy(() => GenderSchema),
                    z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsUpsertWithWhereUniqueWithoutClubInputSchema: z.ZodType<Prisma.LocationsUpsertWithWhereUniqueWithoutClubInput> =
    z
        .object({
            where: z.lazy(() => LocationsWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => LocationsUpdateWithoutClubInputSchema),
                z.lazy(() => LocationsUncheckedUpdateWithoutClubInputSchema),
            ]),
            create: z.union([
                z.lazy(() => LocationsCreateWithoutClubInputSchema),
                z.lazy(() => LocationsUncheckedCreateWithoutClubInputSchema),
            ]),
        })
        .strict();

export const LocationsUpdateWithWhereUniqueWithoutClubInputSchema: z.ZodType<Prisma.LocationsUpdateWithWhereUniqueWithoutClubInput> =
    z
        .object({
            where: z.lazy(() => LocationsWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => LocationsUpdateWithoutClubInputSchema),
                z.lazy(() => LocationsUncheckedUpdateWithoutClubInputSchema),
            ]),
        })
        .strict();

export const LocationsUpdateManyWithWhereWithoutClubInputSchema: z.ZodType<Prisma.LocationsUpdateManyWithWhereWithoutClubInput> =
    z
        .object({
            where: z.lazy(() => LocationsScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => LocationsUpdateManyMutationInputSchema),
                z.lazy(
                    () => LocationsUncheckedUpdateManyWithoutClubInputSchema,
                ),
            ]),
        })
        .strict();

export const LocationsScalarWhereInputSchema: z.ZodType<Prisma.LocationsScalarWhereInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => LocationsScalarWhereInputSchema),
                    z.lazy(() => LocationsScalarWhereInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => LocationsScalarWhereInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => LocationsScalarWhereInputSchema),
                    z.lazy(() => LocationsScalarWhereInputSchema).array(),
                ])
                .optional(),
            id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
            name: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            clubId: z
                .union([z.lazy(() => IntFilterSchema), z.number()])
                .optional(),
            address: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
        })
        .strict();

export const ClubsCreateWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsCreateWithoutLocationsInput> =
    z
        .object({
            name: z.string(),
            description: z.string(),
            logo: z.string(),
            activity: z.lazy(
                () => ActivitiesCreateNestedOneWithoutClubsInputSchema,
            ),
        })
        .strict();

export const ClubsUncheckedCreateWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsUncheckedCreateWithoutLocationsInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            description: z.string(),
            logo: z.string(),
            activityId: z.number().int(),
        })
        .strict();

export const ClubsCreateOrConnectWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsCreateOrConnectWithoutLocationsInput> =
    z
        .object({
            where: z.lazy(() => ClubsWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => ClubsCreateWithoutLocationsInputSchema),
                z.lazy(() => ClubsUncheckedCreateWithoutLocationsInputSchema),
            ]),
        })
        .strict();

export const ClubsUpsertWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsUpsertWithoutLocationsInput> =
    z
        .object({
            update: z.union([
                z.lazy(() => ClubsUpdateWithoutLocationsInputSchema),
                z.lazy(() => ClubsUncheckedUpdateWithoutLocationsInputSchema),
            ]),
            create: z.union([
                z.lazy(() => ClubsCreateWithoutLocationsInputSchema),
                z.lazy(() => ClubsUncheckedCreateWithoutLocationsInputSchema),
            ]),
            where: z.lazy(() => ClubsWhereInputSchema).optional(),
        })
        .strict();

export const ClubsUpdateToOneWithWhereWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsUpdateToOneWithWhereWithoutLocationsInput> =
    z
        .object({
            where: z.lazy(() => ClubsWhereInputSchema).optional(),
            data: z.union([
                z.lazy(() => ClubsUpdateWithoutLocationsInputSchema),
                z.lazy(() => ClubsUncheckedUpdateWithoutLocationsInputSchema),
            ]),
        })
        .strict();

export const ClubsUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsUpdateWithoutLocationsInput> =
    z
        .object({
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            activity: z
                .lazy(
                    () =>
                        ActivitiesUpdateOneRequiredWithoutClubsNestedInputSchema,
                )
                .optional(),
        })
        .strict();

export const ClubsUncheckedUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.ClubsUncheckedUpdateWithoutLocationsInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            activityId: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const ClubsCreateManyActivityInputSchema: z.ZodType<Prisma.ClubsCreateManyActivityInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            description: z.string(),
            logo: z.string(),
        })
        .strict();

export const ClubsUpdateWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUpdateWithoutActivityInput> =
    z
        .object({
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            locations: z
                .lazy(() => LocationsUpdateManyWithoutClubNestedInputSchema)
                .optional(),
        })
        .strict();

export const ClubsUncheckedUpdateWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUncheckedUpdateWithoutActivityInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            locations: z
                .lazy(
                    () =>
                        LocationsUncheckedUpdateManyWithoutClubNestedInputSchema,
                )
                .optional(),
        })
        .strict();

export const ClubsUncheckedUpdateManyWithoutActivityInputSchema: z.ZodType<Prisma.ClubsUncheckedUpdateManyWithoutActivityInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            description: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            logo: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsCreateManyClubInputSchema: z.ZodType<Prisma.LocationsCreateManyClubInput> =
    z
        .object({
            id: z.number().int().optional(),
            name: z.string(),
            address: z.string(),
        })
        .strict();

export const LocationsUpdateWithoutClubInputSchema: z.ZodType<Prisma.LocationsUpdateWithoutClubInput> =
    z
        .object({
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsUncheckedUpdateWithoutClubInputSchema: z.ZodType<Prisma.LocationsUncheckedUpdateWithoutClubInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

export const LocationsUncheckedUpdateManyWithoutClubInputSchema: z.ZodType<Prisma.LocationsUncheckedUpdateManyWithoutClubInput> =
    z
        .object({
            id: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
        })
        .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ActivitiesFindFirstArgsSchema: z.ZodType<Prisma.ActivitiesFindFirstArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            where: ActivitiesWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ActivitiesOrderByWithRelationInputSchema.array(),
                    ActivitiesOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: ActivitiesWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ActivitiesScalarFieldEnumSchema,
                    ActivitiesScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const ActivitiesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ActivitiesFindFirstOrThrowArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            where: ActivitiesWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ActivitiesOrderByWithRelationInputSchema.array(),
                    ActivitiesOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: ActivitiesWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ActivitiesScalarFieldEnumSchema,
                    ActivitiesScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const ActivitiesFindManyArgsSchema: z.ZodType<Prisma.ActivitiesFindManyArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            where: ActivitiesWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ActivitiesOrderByWithRelationInputSchema.array(),
                    ActivitiesOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: ActivitiesWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ActivitiesScalarFieldEnumSchema,
                    ActivitiesScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const ActivitiesAggregateArgsSchema: z.ZodType<Prisma.ActivitiesAggregateArgs> =
    z
        .object({
            where: ActivitiesWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ActivitiesOrderByWithRelationInputSchema.array(),
                    ActivitiesOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: ActivitiesWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const ActivitiesGroupByArgsSchema: z.ZodType<Prisma.ActivitiesGroupByArgs> =
    z
        .object({
            where: ActivitiesWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ActivitiesOrderByWithAggregationInputSchema.array(),
                    ActivitiesOrderByWithAggregationInputSchema,
                ])
                .optional(),
            by: ActivitiesScalarFieldEnumSchema.array(),
            having: ActivitiesScalarWhereWithAggregatesInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const ActivitiesFindUniqueArgsSchema: z.ZodType<Prisma.ActivitiesFindUniqueArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            where: ActivitiesWhereUniqueInputSchema,
        })
        .strict();

export const ActivitiesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ActivitiesFindUniqueOrThrowArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            where: ActivitiesWhereUniqueInputSchema,
        })
        .strict();

export const ClubsFindFirstArgsSchema: z.ZodType<Prisma.ClubsFindFirstArgs> = z
    .object({
        select: ClubsSelectSchema.optional(),
        include: ClubsIncludeSchema.optional(),
        where: ClubsWhereInputSchema.optional(),
        orderBy: z
            .union([
                ClubsOrderByWithRelationInputSchema.array(),
                ClubsOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: ClubsWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z
            .union([
                ClubsScalarFieldEnumSchema,
                ClubsScalarFieldEnumSchema.array(),
            ])
            .optional(),
    })
    .strict();

export const ClubsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClubsFindFirstOrThrowArgs> =
    z
        .object({
            select: ClubsSelectSchema.optional(),
            include: ClubsIncludeSchema.optional(),
            where: ClubsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ClubsOrderByWithRelationInputSchema.array(),
                    ClubsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: ClubsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ClubsScalarFieldEnumSchema,
                    ClubsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const ClubsFindManyArgsSchema: z.ZodType<Prisma.ClubsFindManyArgs> = z
    .object({
        select: ClubsSelectSchema.optional(),
        include: ClubsIncludeSchema.optional(),
        where: ClubsWhereInputSchema.optional(),
        orderBy: z
            .union([
                ClubsOrderByWithRelationInputSchema.array(),
                ClubsOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: ClubsWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z
            .union([
                ClubsScalarFieldEnumSchema,
                ClubsScalarFieldEnumSchema.array(),
            ])
            .optional(),
    })
    .strict();

export const ClubsAggregateArgsSchema: z.ZodType<Prisma.ClubsAggregateArgs> = z
    .object({
        where: ClubsWhereInputSchema.optional(),
        orderBy: z
            .union([
                ClubsOrderByWithRelationInputSchema.array(),
                ClubsOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: ClubsWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export const ClubsGroupByArgsSchema: z.ZodType<Prisma.ClubsGroupByArgs> = z
    .object({
        where: ClubsWhereInputSchema.optional(),
        orderBy: z
            .union([
                ClubsOrderByWithAggregationInputSchema.array(),
                ClubsOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: ClubsScalarFieldEnumSchema.array(),
        having: ClubsScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export const ClubsFindUniqueArgsSchema: z.ZodType<Prisma.ClubsFindUniqueArgs> =
    z
        .object({
            select: ClubsSelectSchema.optional(),
            include: ClubsIncludeSchema.optional(),
            where: ClubsWhereUniqueInputSchema,
        })
        .strict();

export const ClubsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClubsFindUniqueOrThrowArgs> =
    z
        .object({
            select: ClubsSelectSchema.optional(),
            include: ClubsIncludeSchema.optional(),
            where: ClubsWhereUniqueInputSchema,
        })
        .strict();

export const LocationsFindFirstArgsSchema: z.ZodType<Prisma.LocationsFindFirstArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            where: LocationsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    LocationsOrderByWithRelationInputSchema.array(),
                    LocationsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: LocationsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    LocationsScalarFieldEnumSchema,
                    LocationsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const LocationsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationsFindFirstOrThrowArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            where: LocationsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    LocationsOrderByWithRelationInputSchema.array(),
                    LocationsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: LocationsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    LocationsScalarFieldEnumSchema,
                    LocationsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const LocationsFindManyArgsSchema: z.ZodType<Prisma.LocationsFindManyArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            where: LocationsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    LocationsOrderByWithRelationInputSchema.array(),
                    LocationsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: LocationsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    LocationsScalarFieldEnumSchema,
                    LocationsScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const LocationsAggregateArgsSchema: z.ZodType<Prisma.LocationsAggregateArgs> =
    z
        .object({
            where: LocationsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    LocationsOrderByWithRelationInputSchema.array(),
                    LocationsOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: LocationsWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const LocationsGroupByArgsSchema: z.ZodType<Prisma.LocationsGroupByArgs> =
    z
        .object({
            where: LocationsWhereInputSchema.optional(),
            orderBy: z
                .union([
                    LocationsOrderByWithAggregationInputSchema.array(),
                    LocationsOrderByWithAggregationInputSchema,
                ])
                .optional(),
            by: LocationsScalarFieldEnumSchema.array(),
            having: LocationsScalarWhereWithAggregatesInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict();

export const LocationsFindUniqueArgsSchema: z.ZodType<Prisma.LocationsFindUniqueArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            where: LocationsWhereUniqueInputSchema,
        })
        .strict();

export const LocationsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationsFindUniqueOrThrowArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            where: LocationsWhereUniqueInputSchema,
        })
        .strict();

export const UsersFindFirstArgsSchema: z.ZodType<Prisma.UsersFindFirstArgs> = z
    .object({
        select: UsersSelectSchema.optional(),
        where: UsersWhereInputSchema.optional(),
        orderBy: z
            .union([
                UsersOrderByWithRelationInputSchema.array(),
                UsersOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: UsersWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z
            .union([
                UsersScalarFieldEnumSchema,
                UsersScalarFieldEnumSchema.array(),
            ])
            .optional(),
    })
    .strict();

export const UsersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersFindFirstOrThrowArgs> =
    z
        .object({
            select: UsersSelectSchema.optional(),
            where: UsersWhereInputSchema.optional(),
            orderBy: z
                .union([
                    UsersOrderByWithRelationInputSchema.array(),
                    UsersOrderByWithRelationInputSchema,
                ])
                .optional(),
            cursor: UsersWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    UsersScalarFieldEnumSchema,
                    UsersScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict();

export const UsersFindManyArgsSchema: z.ZodType<Prisma.UsersFindManyArgs> = z
    .object({
        select: UsersSelectSchema.optional(),
        where: UsersWhereInputSchema.optional(),
        orderBy: z
            .union([
                UsersOrderByWithRelationInputSchema.array(),
                UsersOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: UsersWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z
            .union([
                UsersScalarFieldEnumSchema,
                UsersScalarFieldEnumSchema.array(),
            ])
            .optional(),
    })
    .strict();

export const UsersAggregateArgsSchema: z.ZodType<Prisma.UsersAggregateArgs> = z
    .object({
        where: UsersWhereInputSchema.optional(),
        orderBy: z
            .union([
                UsersOrderByWithRelationInputSchema.array(),
                UsersOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: UsersWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export const UsersGroupByArgsSchema: z.ZodType<Prisma.UsersGroupByArgs> = z
    .object({
        where: UsersWhereInputSchema.optional(),
        orderBy: z
            .union([
                UsersOrderByWithAggregationInputSchema.array(),
                UsersOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: UsersScalarFieldEnumSchema.array(),
        having: UsersScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export const UsersFindUniqueArgsSchema: z.ZodType<Prisma.UsersFindUniqueArgs> =
    z
        .object({
            select: UsersSelectSchema.optional(),
            where: UsersWhereUniqueInputSchema,
        })
        .strict();

export const UsersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersFindUniqueOrThrowArgs> =
    z
        .object({
            select: UsersSelectSchema.optional(),
            where: UsersWhereUniqueInputSchema,
        })
        .strict();

export const ActivitiesCreateArgsSchema: z.ZodType<Prisma.ActivitiesCreateArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            data: z.union([
                ActivitiesCreateInputSchema,
                ActivitiesUncheckedCreateInputSchema,
            ]),
        })
        .strict();

export const ActivitiesUpsertArgsSchema: z.ZodType<Prisma.ActivitiesUpsertArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            where: ActivitiesWhereUniqueInputSchema,
            create: z.union([
                ActivitiesCreateInputSchema,
                ActivitiesUncheckedCreateInputSchema,
            ]),
            update: z.union([
                ActivitiesUpdateInputSchema,
                ActivitiesUncheckedUpdateInputSchema,
            ]),
        })
        .strict();

export const ActivitiesCreateManyArgsSchema: z.ZodType<Prisma.ActivitiesCreateManyArgs> =
    z
        .object({
            data: z.union([
                ActivitiesCreateManyInputSchema,
                ActivitiesCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const ActivitiesDeleteArgsSchema: z.ZodType<Prisma.ActivitiesDeleteArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            where: ActivitiesWhereUniqueInputSchema,
        })
        .strict();

export const ActivitiesUpdateArgsSchema: z.ZodType<Prisma.ActivitiesUpdateArgs> =
    z
        .object({
            select: ActivitiesSelectSchema.optional(),
            include: ActivitiesIncludeSchema.optional(),
            data: z.union([
                ActivitiesUpdateInputSchema,
                ActivitiesUncheckedUpdateInputSchema,
            ]),
            where: ActivitiesWhereUniqueInputSchema,
        })
        .strict();

export const ActivitiesUpdateManyArgsSchema: z.ZodType<Prisma.ActivitiesUpdateManyArgs> =
    z
        .object({
            data: z.union([
                ActivitiesUpdateManyMutationInputSchema,
                ActivitiesUncheckedUpdateManyInputSchema,
            ]),
            where: ActivitiesWhereInputSchema.optional(),
        })
        .strict();

export const ActivitiesDeleteManyArgsSchema: z.ZodType<Prisma.ActivitiesDeleteManyArgs> =
    z
        .object({
            where: ActivitiesWhereInputSchema.optional(),
        })
        .strict();

export const ClubsCreateArgsSchema: z.ZodType<Prisma.ClubsCreateArgs> = z
    .object({
        select: ClubsSelectSchema.optional(),
        include: ClubsIncludeSchema.optional(),
        data: z.union([
            ClubsCreateInputSchema,
            ClubsUncheckedCreateInputSchema,
        ]),
    })
    .strict();

export const ClubsUpsertArgsSchema: z.ZodType<Prisma.ClubsUpsertArgs> = z
    .object({
        select: ClubsSelectSchema.optional(),
        include: ClubsIncludeSchema.optional(),
        where: ClubsWhereUniqueInputSchema,
        create: z.union([
            ClubsCreateInputSchema,
            ClubsUncheckedCreateInputSchema,
        ]),
        update: z.union([
            ClubsUpdateInputSchema,
            ClubsUncheckedUpdateInputSchema,
        ]),
    })
    .strict();

export const ClubsCreateManyArgsSchema: z.ZodType<Prisma.ClubsCreateManyArgs> =
    z
        .object({
            data: z.union([
                ClubsCreateManyInputSchema,
                ClubsCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const ClubsDeleteArgsSchema: z.ZodType<Prisma.ClubsDeleteArgs> = z
    .object({
        select: ClubsSelectSchema.optional(),
        include: ClubsIncludeSchema.optional(),
        where: ClubsWhereUniqueInputSchema,
    })
    .strict();

export const ClubsUpdateArgsSchema: z.ZodType<Prisma.ClubsUpdateArgs> = z
    .object({
        select: ClubsSelectSchema.optional(),
        include: ClubsIncludeSchema.optional(),
        data: z.union([
            ClubsUpdateInputSchema,
            ClubsUncheckedUpdateInputSchema,
        ]),
        where: ClubsWhereUniqueInputSchema,
    })
    .strict();

export const ClubsUpdateManyArgsSchema: z.ZodType<Prisma.ClubsUpdateManyArgs> =
    z
        .object({
            data: z.union([
                ClubsUpdateManyMutationInputSchema,
                ClubsUncheckedUpdateManyInputSchema,
            ]),
            where: ClubsWhereInputSchema.optional(),
        })
        .strict();

export const ClubsDeleteManyArgsSchema: z.ZodType<Prisma.ClubsDeleteManyArgs> =
    z
        .object({
            where: ClubsWhereInputSchema.optional(),
        })
        .strict();

export const LocationsCreateArgsSchema: z.ZodType<Prisma.LocationsCreateArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            data: z.union([
                LocationsCreateInputSchema,
                LocationsUncheckedCreateInputSchema,
            ]),
        })
        .strict();

export const LocationsUpsertArgsSchema: z.ZodType<Prisma.LocationsUpsertArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            where: LocationsWhereUniqueInputSchema,
            create: z.union([
                LocationsCreateInputSchema,
                LocationsUncheckedCreateInputSchema,
            ]),
            update: z.union([
                LocationsUpdateInputSchema,
                LocationsUncheckedUpdateInputSchema,
            ]),
        })
        .strict();

export const LocationsCreateManyArgsSchema: z.ZodType<Prisma.LocationsCreateManyArgs> =
    z
        .object({
            data: z.union([
                LocationsCreateManyInputSchema,
                LocationsCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const LocationsDeleteArgsSchema: z.ZodType<Prisma.LocationsDeleteArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            where: LocationsWhereUniqueInputSchema,
        })
        .strict();

export const LocationsUpdateArgsSchema: z.ZodType<Prisma.LocationsUpdateArgs> =
    z
        .object({
            select: LocationsSelectSchema.optional(),
            include: LocationsIncludeSchema.optional(),
            data: z.union([
                LocationsUpdateInputSchema,
                LocationsUncheckedUpdateInputSchema,
            ]),
            where: LocationsWhereUniqueInputSchema,
        })
        .strict();

export const LocationsUpdateManyArgsSchema: z.ZodType<Prisma.LocationsUpdateManyArgs> =
    z
        .object({
            data: z.union([
                LocationsUpdateManyMutationInputSchema,
                LocationsUncheckedUpdateManyInputSchema,
            ]),
            where: LocationsWhereInputSchema.optional(),
        })
        .strict();

export const LocationsDeleteManyArgsSchema: z.ZodType<Prisma.LocationsDeleteManyArgs> =
    z
        .object({
            where: LocationsWhereInputSchema.optional(),
        })
        .strict();

export const UsersCreateArgsSchema: z.ZodType<Prisma.UsersCreateArgs> = z
    .object({
        select: UsersSelectSchema.optional(),
        data: z.union([
            UsersCreateInputSchema,
            UsersUncheckedCreateInputSchema,
        ]),
    })
    .strict();

export const UsersUpsertArgsSchema: z.ZodType<Prisma.UsersUpsertArgs> = z
    .object({
        select: UsersSelectSchema.optional(),
        where: UsersWhereUniqueInputSchema,
        create: z.union([
            UsersCreateInputSchema,
            UsersUncheckedCreateInputSchema,
        ]),
        update: z.union([
            UsersUpdateInputSchema,
            UsersUncheckedUpdateInputSchema,
        ]),
    })
    .strict();

export const UsersCreateManyArgsSchema: z.ZodType<Prisma.UsersCreateManyArgs> =
    z
        .object({
            data: z.union([
                UsersCreateManyInputSchema,
                UsersCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export const UsersDeleteArgsSchema: z.ZodType<Prisma.UsersDeleteArgs> = z
    .object({
        select: UsersSelectSchema.optional(),
        where: UsersWhereUniqueInputSchema,
    })
    .strict();

export const UsersUpdateArgsSchema: z.ZodType<Prisma.UsersUpdateArgs> = z
    .object({
        select: UsersSelectSchema.optional(),
        data: z.union([
            UsersUpdateInputSchema,
            UsersUncheckedUpdateInputSchema,
        ]),
        where: UsersWhereUniqueInputSchema,
    })
    .strict();

export const UsersUpdateManyArgsSchema: z.ZodType<Prisma.UsersUpdateManyArgs> =
    z
        .object({
            data: z.union([
                UsersUpdateManyMutationInputSchema,
                UsersUncheckedUpdateManyInputSchema,
            ]),
            where: UsersWhereInputSchema.optional(),
        })
        .strict();

export const UsersDeleteManyArgsSchema: z.ZodType<Prisma.UsersDeleteManyArgs> =
    z
        .object({
            where: UsersWhereInputSchema.optional(),
        })
        .strict();
