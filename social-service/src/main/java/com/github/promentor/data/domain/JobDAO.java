package com.github.promentor.data.domain;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.types.ObjectId;

import java.util.List;

@MongoEntity(collection="Job")
public class JobDAO  extends AuditableEntityDAO{

    public ObjectId id;
    public String title;
    public String companyName;
    public String description;
    public LocationDAO location;
    public JobTypeDAO type;
    public JobModalityDAO modality;
    public List<TagDAO> tags;
    public String createdBy;

    public JobDAO() {
        super();
    }

    public JobDAO(String title, String description, LocationDAO location, JobTypeDAO type, JobModalityDAO modality, List<TagDAO> tags, String companyName, String createdBy) {
        super();
        this.title = title;
        this.description = description;
        this.location = location;
        this.type = type;
        this.modality = modality;
        this.tags = tags;
        this.companyName = companyName;
        this.createdBy = createdBy;
    }
}
