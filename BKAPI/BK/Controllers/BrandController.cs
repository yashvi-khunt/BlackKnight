using AutoMapper;
using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BK.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IMapper _mapper;

        public BrandsController(IBrandService brandService, IMapper mapper)
        {
            _brandService = brandService;
            _mapper = mapper;
        }
        
        [HttpPost]
        public async Task<IActionResult> AddBrand(VMAddBrand addBrandModel)
        {
            try
            {
                await _brandService.AddBrand(addBrandModel);
                return Ok(new Response("Brand added successfully!"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response( $"Internal server error: {ex.Message}",false));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrand(int id, VMAddBrand updateBrandModel)
        {
            try
            {
                await _brandService.UpdateBrand(id, updateBrandModel);
                return Ok(new Response("Brand updated successfully!"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response( $"Internal server error: {ex.Message}",false));
            }
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<VMBrandDetails>> GetBrandById(int id)
        {
            try
            {
                var brandDetails = await _brandService.GetBrandById(id);
                if (brandDetails == null)
                {
                    return NotFound(new Response("Brand not found.",false));
                }

                var brandDetailsVm = _mapper.Map<VMBrandDetails>(brandDetails);
                return Ok(new Response<VMBrandDetails>(brandDetailsVm,true,"Brand loaded successfully!"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response( $"Internal server error: {ex.Message}",false));
            }
        }
        
        [HttpGet("Options/{clientId}")]
        public async Task<ActionResult<List<VMOptions>>> GetBrandOptions(string clientId)
        {
            try
            {
                var brandOptions = await _brandService.GetBrandOptions(clientId);
                return Ok(new Response<List<VMOptions>>(brandOptions));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response( $"Internal server error: {ex.Message}",false));
            }
        }
    }
}
