import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

@EntityRepository(Tag)
class TagsRepositeries extends Repository<Tag> {}

export { TagsRepositeries }