using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.ViewModels;
using BK.DAL.ViewModels.PaperType;
using Microsoft.AspNetCore.Mvc;

namespace BKAPI.Controllers;


[Route("api/[controller]")]
[ApiController]
public class PaperController : ControllerBase
{

    private readonly IPaperTypeService _paperTypeService;
    private readonly IMapper _mapper;

    public PaperController(IPaperTypeService paperTypeService, IMapper mapper)
    {
        _paperTypeService = paperTypeService;
        _mapper = mapper;
    }

    // Add a new paper type
    [HttpPost]
    public async Task<IActionResult> AddPaperType(VMAddPaperType addPaperTypeModel)
    {
        try
        {
            await _paperTypeService.AddPaperType(addPaperTypeModel);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Update an existing paper type
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePaperType(int id, VMAddPaperType updatePaperTypeModel)
    {
        try
        {
            await _paperTypeService.UpdatePaperType(id, updatePaperTypeModel);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Get paper type details by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<VMPaperTypeDetails>> GetPaperTypeById(int id)
    {
        try
        {
            var paperTypeDetails = await _paperTypeService.GetPaperTypeById(id);
            if (paperTypeDetails == null)
            {
                return NotFound();
            }

            var paperTypeDetailsVm = _mapper.Map<VMPaperTypeDetails>(paperTypeDetails);
            return Ok(paperTypeDetailsVm);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Get paper type options for dropdown
    [HttpGet("Options")]
    public async Task<ActionResult<List<VMOptions>>> GetPaperTypeOptions()
    {
        try
        {
            var paperTypeOptions = await _paperTypeService.GetPaperTypeOptions();
            return Ok(paperTypeOptions);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
