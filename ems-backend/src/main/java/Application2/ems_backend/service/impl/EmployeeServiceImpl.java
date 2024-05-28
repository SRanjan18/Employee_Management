package Application2.ems_backend.service.impl;

import Application2.ems_backend.dto.EmployeeDto;
import Application2.ems_backend.entity.Employee;
import Application2.ems_backend.exception.ResourceNotFoundException;
import Application2.ems_backend.mapper.EmployeeMapper;
import Application2.ems_backend.repository.EmployeeRepository;
import Application2.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);


    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
      Employee employee=
              employeeRepository.findById(employeeId)
                      .orElseThrow(()->
                              new ResourceNotFoundException("Employee id:"+employeeId+"does not exist"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees =
                employeeRepository.findAll();
        //logic to convert list of employees to list of employeesdto
        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());

    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee id:"+employeeId+"does not exist"));
employee.setFirstname(updatedEmployee.getFirstname());
employee.setLastname(updatedEmployee.getLastname());
employee.setEmail(updatedEmployee.getEmail());
        Employee updatedEmployeeObj=employeeRepository.save(employee);

return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployeeById(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee id:"+employeeId+"does not exist"));
employeeRepository.deleteById(employeeId);
    }


}
