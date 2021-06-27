import { getCustomRepository } from "typeorm"
import { TagsRepositeries } from "../repositories/TagsRepositories"



class CreateTagService {
  
  async execute(name: string) {
    const tagsRepositeries = getCustomRepository(TagsRepositeries);

    if (!name) {
      throw new Error("incorrect name!");
    }

    const tagAlreadyExists = await tagsRepositeries.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new Error("Tag already exists!");
    }

    const tag = tagsRepositeries.create({
      name,
    });

    await tagsRepositeries.save(tag);

    return tag;
  } 
}

export { CreateTagService }