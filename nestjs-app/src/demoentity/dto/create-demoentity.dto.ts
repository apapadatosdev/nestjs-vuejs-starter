import { IsDateString, IsString, Length } from "class-validator" //


//For more details about what decorators are available and how to use them visit:
// https://github.com/typestack/class-validator#validation-decorators
// also check this about the class transformer (serialization)
// https://github.com/typestack/class-transformer#implicit-type-conversion

export class CreateDemoentityDto {    
    field_bigint: string        
    field_int: number    
    field_decimal: string    
    @IsString() //
    @Length(5, 10, {message: "This field is supposed to be between 5 to 10 characters long..."}) //
    field_varchar: string
    field_boolean: boolean
    field_bytea: string    
    field_timestamptz: Date
    //BELOW DEMO IF YOU WANT TO USE VALIDATION GROUPS
    //@IsDateString({groups: ['validation_group_xyz']}) //
    @IsDateString() //
    field_date: string
    field_time_tz: string
    field_xml: string
    field_json: string    
    aud_create_user: Number;
    aud_update_user: Number;
}
