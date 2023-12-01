import { Comment, mockComments } from '@/entities/Comment/testing';
import { EntityState } from '@reduxjs/toolkit';
/* 
const s = {
	[mockComments[0].id]: mockComments[0],
	[mockComments[1].id]: mockComments[1],
	[mockComments[2].id]: mockComments[2],
};

export const mockCommentsEntities: EntityState<Comment> = {
	entities: s,
	ids: [1, 2, 3],
};
 */

export const mockCommentsEntities: EntityState<Comment> = {
	entities: {},
	ids: [],
};

mockComments.forEach((entity: Comment) => {
	mockCommentsEntities.entities[entity.id] = entity;
	mockCommentsEntities.ids.push(entity.id);
});
