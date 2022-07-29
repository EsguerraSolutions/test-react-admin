import * as React from "react";
import { useMediaQuery } from '@mui/material';
import { List, SimpleList , Datagrid, TextField, ReferenceField , EditButton , Edit, Create , ReferenceInput, SelectInput, SimpleForm, TextInput , useRecordContext } from 'react-admin';

//LIST FOR POSTS

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users">
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

// FOR RESPONSIVE VIEW
export const PostList = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <List filters={postFilters}>
        {
            isSmall ? (
            <SimpleList
                primaryText={record => record.title}
                secondaryText={record => (
                    <ReferenceField label="User" source="userId" reference="users">
                    <TextField source="name" />
                    </ReferenceField>
                )}
            />
            ) : (
            <Datagrid>
                <ReferenceField source="userId" reference="users">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="body" />
                <EditButton />
            </Datagrid>            
            )
        }
    </List>
    );
}

//EDIT FOR POSTS 

const PostTitle = () => {
    const record = useRecordContext();
    return (
        <span>
            Post {record ? `"${record.title}"` : ''}
        </span>
    );
};

export const PostEdit = () => (
    <Edit title={<PostTitle/>}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

//CREATE FOR POSTS

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" rows={5} />
        </SimpleForm>
    </Create>
);