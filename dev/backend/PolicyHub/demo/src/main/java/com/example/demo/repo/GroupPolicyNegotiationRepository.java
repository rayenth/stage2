package com.example.demo.repositories;

import com.example.demo.models.GroupPolicyNegotiation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupPolicyNegotiationRepository extends MongoRepository<GroupPolicyNegotiation, ObjectId> {

    // Custom query to find contracts by company_id, resolving the name mismatch
    @Query("{ 'company_id' : ?0 }")
    List<GroupPolicyNegotiation> findByCompanyId(ObjectId companyId);
}
