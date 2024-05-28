package Application2.ems_backend.controller;

import Application2.ems_backend.dto.EmployeeDto;
import Application2.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    //add employee rest api
    @PostMapping()
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee=employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //get employee by id rest api
@GetMapping("{id}")
    public ResponseEntity<EmployeeDto>getemployeeById(@PathVariable("id") Long employeeId){
       EmployeeDto employeeDto= employeeService.getEmployeeById(employeeId);
       return ResponseEntity.ok(employeeDto);
    }
    //get all employess rest api
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllemployee(){
        List<EmployeeDto> employees=employeeService.getAllEmployee();
        return  ResponseEntity.ok(employees);
    }

    //update employee rest api
@PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody EmployeeDto updtaedEmployee){
EmployeeDto employeeDto=employeeService.updateEmployee(employeeId,updtaedEmployee);
 return  ResponseEntity.ok(employeeDto);
    }

    //delete emplyee by id
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployeeById(employeeId);
        return ResponseEntity.ok("Employee deleted successfully");
    }

}
