package com.example.demo.controllers;

import com.example.demo.models.GroupPolicyNegotiation;
import com.example.demo.services.GroupPolicyNegotiationService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/contracts")
public class GroupPolicyNegotiationController {

    @Autowired
    private GroupPolicyNegotiationService groupPolicyNegotiationService;

    @GetMapping
    public List<Map<String, Object>> getAllContracts() {
        return groupPolicyNegotiationService.getAllContractsWithCompanyDetails();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getContractById(@PathVariable("id") ObjectId id) {
        return groupPolicyNegotiationService.getContractByIdWithCompanyDetails(id);
    }

    @GetMapping("/company/{companyId}")
    public List<GroupPolicyNegotiation> getContractsByCompanyId(@PathVariable("companyId") ObjectId companyId) {
        return groupPolicyNegotiationService.getContractsByCompanyId(companyId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GroupPolicyNegotiation createContract(@RequestBody GroupPolicyNegotiation groupPolicyNegotiation) {
        return groupPolicyNegotiationService.createContract(groupPolicyNegotiation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupPolicyNegotiation> updateContract(@PathVariable("id") ObjectId id, @RequestBody GroupPolicyNegotiation groupPolicyNegotiation) {
        return groupPolicyNegotiationService.updateContract(id, groupPolicyNegotiation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContract(@PathVariable("id") ObjectId id) {
        groupPolicyNegotiationService.deleteContract(id);
    }
}
